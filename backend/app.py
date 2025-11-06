from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime
import csv
import io

app = Flask(__name__)
CORS(app)

# Database path
DB_PATH = os.path.join(os.path.dirname(__file__), 'coding_data.db')

def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize database tables"""
    conn = get_db()
    cursor = conn.cursor()
    
    # Helper: check if a column exists
    def column_exists(table: str, column: str) -> bool:
        try:
            cursor.execute(f"PRAGMA table_info({table})")
            cols = [row[1] for row in cursor.fetchall()]
            return column in cols
        except Exception:
            return False

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            class_id TEXT NOT NULL,
            last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(name, class_id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT NOT NULL,
            class_id TEXT NOT NULL,
            code_name TEXT NOT NULL,
            code_color TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_name, class_id) REFERENCES students(name, class_id)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS highlights (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT NOT NULL,
            class_id TEXT NOT NULL,
            code_id INTEGER NOT NULL,
            text_content TEXT NOT NULL,
            interview_id TEXT,
            start_offset INTEGER,
            end_offset INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_name, class_id) REFERENCES students(name, class_id),
            FOREIGN KEY (code_id) REFERENCES codes(id)
        )
    ''')
    
    # MIGRATIONS: Add class_id columns if upgrading from old schema
    # students.class_id
    if not column_exists('students', 'class_id'):
        cursor.execute("ALTER TABLE students ADD COLUMN class_id TEXT DEFAULT 'class1'")
        cursor.execute("UPDATE students SET class_id = 'class1' WHERE class_id IS NULL")

    # codes.class_id
    if not column_exists('codes', 'class_id'):
        cursor.execute("ALTER TABLE codes ADD COLUMN class_id TEXT")
        # Backfill from students table
        cursor.execute(
            "UPDATE codes SET class_id = (SELECT s.class_id FROM students s WHERE s.name = codes.student_name LIMIT 1)"
        )
        # Default to 'class1' if still NULL
        cursor.execute("UPDATE codes SET class_id = 'class1' WHERE class_id IS NULL")

    # highlights.class_id
    if not column_exists('highlights', 'class_id'):
        cursor.execute("ALTER TABLE highlights ADD COLUMN class_id TEXT")
        # Prefer backfill via students if available
        cursor.execute(
            "UPDATE highlights SET class_id = (SELECT s.class_id FROM students s WHERE s.name = highlights.student_name LIMIT 1)"
        )
        cursor.execute("UPDATE highlights SET class_id = 'class1' WHERE class_id IS NULL")

    conn.commit()
    conn.close()

def get_or_create_student(name, class_id):
    """Get or create a student"""
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('SELECT * FROM students WHERE name = ? AND class_id = ?', (name, class_id))
    student = cursor.fetchone()
    
    if not student:
        cursor.execute('INSERT INTO students (name, class_id) VALUES (?, ?)', (name, class_id))
        conn.commit()
        cursor.execute('SELECT * FROM students WHERE name = ? AND class_id = ?', (name, class_id))
        student = cursor.fetchone()
    
    conn.close()
    return student

# Initialize database on startup
init_db()

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/submit-coding', methods=['POST'])
def submit_coding():
    """Submit student coding data"""
    try:
        data = request.json
        student_name = data.get('studentName')
        class_id = data.get('classId')
        codes = data.get('codes', [])
        highlights = data.get('highlights', {})
        
        if not student_name:
            return jsonify({'error': 'Student name required'}), 400
        if not class_id:
            return jsonify({'error': 'Class ID required'}), 400
        
        # Get or create student
        get_or_create_student(student_name, class_id)
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Update last_updated
        cursor.execute('UPDATE students SET last_updated = CURRENT_TIMESTAMP WHERE name = ? AND class_id = ?', (student_name, class_id))
        
        # Delete existing codes and highlights for this student in this class
        cursor.execute('DELETE FROM highlights WHERE student_name = ? AND class_id = ?', (student_name, class_id))
        cursor.execute('DELETE FROM codes WHERE student_name = ? AND class_id = ?', (student_name, class_id))
        
        # Insert new codes
        code_map = {}
        for code in codes:
            cursor.execute(
                'INSERT INTO codes (student_name, class_id, code_name, code_color) VALUES (?, ?, ?, ?)',
                (student_name, class_id, code['name'], code.get('color'))
            )
            code_id = cursor.lastrowid
            code_map[code['id']] = code_id
        
        # Insert highlights (prefer absolute offsets if present)
        for interview_id, interview_highlights in highlights.items():
            for highlight in interview_highlights:
                code_id = code_map.get(highlight.get('codeId'))
                if code_id:
                    start_off = highlight.get('absStartOffset')
                    end_off = highlight.get('absEndOffset')
                    if start_off is None or end_off is None:
                        start_off = highlight.get('startOffset')
                        end_off = highlight.get('endOffset')
                    cursor.execute(
                        '''INSERT INTO highlights 
                           (student_name, class_id, code_id, text_content, interview_id, start_offset, end_offset) 
                           VALUES (?, ?, ?, ?, ?, ?, ?)''',
                        (
                            student_name,
                            class_id,
                            code_id,
                            highlight.get('text', ''),
                            interview_id,
                            start_off,
                            end_off
                        )
                    )
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': 'Coding data saved successfully'})
    
    except Exception as e:
        print(f'Error saving coding data: {e}')
        return jsonify({'error': 'Failed to save coding data'}), 500

@app.route('/api/class-data', methods=['GET'])
def get_class_data():
    """Get aggregated class data for comparison"""
    try:
        class_id = request.args.get('classId')
        if not class_id:
            return jsonify({'error': 'Class ID required'}), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Get all students in this class
        cursor.execute('SELECT DISTINCT name FROM students WHERE class_id = ?', (class_id,))
        students = [row[0] for row in cursor.fetchall()]
        
        # Get all codes with counts for this class
        cursor.execute('''
            SELECT 
                code_name as name,
                code_color as color,
                COUNT(DISTINCT student_name) as count
            FROM codes
            WHERE class_id = ?
            GROUP BY code_name, code_color
            ORDER BY count DESC
        ''', (class_id,))
        
        code_stats = []
        for row in cursor.fetchall():
            code_stats.append({
                'name': row['name'],
                'color': row['color'],
                'count': row['count']
            })
        
        conn.close()
        
        return jsonify({
            'students': students,
            'codes': code_stats
        })
    
    except Exception as e:
        print(f'Error fetching class data: {e}')
        return jsonify({'error': 'Failed to fetch class data'}), 500

@app.route('/api/instructor-data', methods=['GET'])
def get_instructor_data():
    """Get instructor dashboard data"""
    try:
        class_id = request.args.get('classId')
        if not class_id:
            return jsonify({'error': 'Class ID required'}), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Get all students in this class - same as CSV export
        cursor.execute('SELECT DISTINCT name FROM students WHERE class_id = ?', (class_id,))
        students = [row[0] for row in cursor.fetchall()]
        
        # Get total codes - use EXACT same pattern as CSV export (LEFT JOIN from students)
        cursor.execute('''
            SELECT COUNT(DISTINCT c.id) as count
            FROM students s
            LEFT JOIN codes c ON s.name = c.student_name AND s.class_id = c.class_id
            WHERE s.class_id = ? AND c.id IS NOT NULL
        ''', (class_id,))
        total_codes_result = cursor.fetchone()
        total_codes = total_codes_result['count'] if total_codes_result else 0
        
        # Get top codes - use EXACT same pattern as CSV export (LEFT JOIN from students)
        cursor.execute('''
            SELECT 
                c.code_name as name,
                c.code_color as color,
                COUNT(DISTINCT c.student_name) as count
            FROM students s
            LEFT JOIN codes c ON s.name = c.student_name AND s.class_id = c.class_id
            WHERE s.class_id = ? AND c.id IS NOT NULL
            GROUP BY c.code_name, c.code_color
            ORDER BY count DESC
            LIMIT 20
        ''', (class_id,))
        
        top_codes = []
        for row in cursor.fetchall():
            top_codes.append({
                'name': row['name'],
                'color': row['color'],
                'count': row['count']
            })
        
        conn.close()
        
        return jsonify({
            'students': students,
            'totalCodes': total_codes,
            'topCodes': top_codes
        })
    
    except Exception as e:
        print(f'Error fetching instructor data: {e}')
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Failed to fetch instructor data'}), 500

@app.route('/api/code-highlights', methods=['GET'])
def get_code_highlights():
    """Get all highlights for a specific code in a class"""
    try:
        class_id = request.args.get('classId')
        code_name = request.args.get('codeName')
        
        if not class_id or not code_name:
            return jsonify({'error': 'Class ID and code name required'}), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Get all highlights for this code in this class
        cursor.execute('''
            SELECT 
                h.id,
                h.student_name,
                h.interview_id,
                h.text_content,
                h.start_offset,
                h.end_offset,
                h.abs_start_offset,
                h.abs_end_offset,
                c.code_name,
                c.code_color
            FROM highlights h
            JOIN codes c ON h.code_id = c.id
            WHERE h.class_id = ? AND c.code_name = ?
            ORDER BY h.student_name, h.interview_id, h.start_offset
        ''', (class_id, code_name))
        
        highlights = []
        for row in cursor.fetchall():
            highlights.append({
                'studentName': row['student_name'],
                'interviewId': row['interview_id'] or 'interview1',
                'text': row['text_content'],
                'startOffset': row['start_offset'],
                'endOffset': row['end_offset'],
                'absStartOffset': row['abs_start_offset'],
                'absEndOffset': row['abs_end_offset'],
                'codeName': row['code_name'],
                'codeColor': row['code_color']
            })
        
        conn.close()
        
        return jsonify({
            'codeName': code_name,
            'highlights': highlights
        })
    
    except Exception as e:
        print(f'Error fetching code highlights: {e}')
        return jsonify({'error': 'Failed to fetch code highlights'}), 500

@app.route('/api/export-csv', methods=['GET'])
def export_csv():
    """Export all coding data as CSV"""
    try:
        class_id = request.args.get('classId')
        if not class_id:
            return jsonify({'error': 'Class ID required'}), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Get all coding data for this class
        cursor.execute('''
            SELECT 
                s.name as student_name,
                c.code_name,
                c.code_color,
                h.text_content,
                h.interview_id,
                h.start_offset,
                h.end_offset
            FROM students s
            LEFT JOIN codes c ON s.name = c.student_name AND s.class_id = c.class_id
            LEFT JOIN highlights h ON c.id = h.code_id AND s.name = h.student_name AND s.class_id = h.class_id
            WHERE s.class_id = ?
            ORDER BY s.name, c.code_name
        ''', (class_id,))
        
        # Create CSV in memory
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write header
        writer.writerow(['Student Name', 'Code Name', 'Code Color', 'Interview ID', 'Text Content', 'Start Offset', 'End Offset'])
        
        # Write data
        for row in cursor.fetchall():
            writer.writerow([
                row['student_name'] or '',
                row['code_name'] or '',
                row['code_color'] or '',
                row['interview_id'] or '',
                row['text_content'] or '',
                row['start_offset'] or '',
                row['end_offset'] or ''
            ])
        
        conn.close()
        
        # Create response
        output.seek(0)
        return send_file(
            io.BytesIO(output.getvalue().encode('utf-8')),
            mimetype='text/csv',
            as_attachment=True,
            download_name=f'coding-data-{datetime.now().strftime("%Y%m%d-%H%M%S")}.csv'
        )
    
    except Exception as e:
        print(f'Error exporting CSV: {e}')
        return jsonify({'error': 'Failed to export CSV'}), 500

@app.route('/api/passage-stats', methods=['GET'])
def passage_stats():
    """Return most-coded passages by interview using interval overlap clustering (IoU-based)."""
    try:
        class_id = request.args.get('classId')
        if not class_id:
            return jsonify({'error': 'Class ID required'}), 400
        
        conn = get_db()
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT h.interview_id, h.text_content, c.code_name, h.student_name, h.start_offset, h.end_offset
            FROM highlights h
            JOIN codes c ON c.id = h.code_id
            WHERE h.class_id = ? AND h.start_offset IS NOT NULL AND h.end_offset IS NOT NULL AND h.end_offset > h.start_offset
            """,
            (class_id,)
        )

        rows = cursor.fetchall()

        from collections import defaultdict, Counter

        # Group by interview
        by_interview = defaultdict(list)
        for r in rows:
            by_interview[r['interview_id']].append({
                'start': int(r['start_offset']),
                'end': int(r['end_offset']),
                'student': r['student_name'],
                'code': r['code_name'],
                'text': (r['text_content'] or '').strip()
            })

        def iou(a, b):
            inter = max(0, min(a['end'], b['end']) - max(a['start'], b['start']))
            if inter == 0:
                return 0.0
            union = max(a['end'], b['end']) - min(a['start'], b['start'])
            return inter / union if union > 0 else 0.0

        IOU_THRESHOLD = 0.3

        passages = []

        for interview_id, segs in by_interview.items():
            if not segs:
                continue
            # Sort by start for a simple greedy clustering
            segs.sort(key=lambda s: (s['start'], s['end']))
            clusters = []  # each cluster: list of segs

            for s in segs:
                assigned = False
                for cluster in clusters:
                    # Check overlap with any seg in cluster (single-linkage)
                    if any(iou(s, t) >= IOU_THRESHOLD for t in cluster):
                        cluster.append(s)
                        assigned = True
                        break
                if not assigned:
                    clusters.append([s])

            # Aggregate clusters
            for cluster in clusters:
                students = {c['student'] for c in cluster}
                codes = Counter([c['code'] for c in cluster])
                # Representative text: most common raw text; fallback to median span length slice from available texts
                if any(c['text'] for c in cluster):
                    display_text = Counter([c['text'] for c in cluster if c['text']]).most_common(1)[0][0]
                else:
                    # Fallback: use the shortest span as proxy text length (text not available)
                    cluster_sorted = sorted(cluster, key=lambda c: (c['end'] - c['start']))
                    display_text = f"[chars {cluster_sorted[0]['start']}–{cluster_sorted[0]['end']}]"

                passages.append({
                    'interviewId': interview_id,
                    'text': display_text[:300],
                    'students': len(students),
                    'codes': [{'name': k, 'count': v} for k, v in codes.most_common()]
                })

        passages.sort(key=lambda x: (x['students'], len(x['text'])), reverse=True)

        conn.close()
        return jsonify({'passages': passages[:50]})
    except Exception as e:
        print(f'Error computing passage stats: {e}')
        return jsonify({'error': 'Failed to compute passage stats'}), 500

@app.route('/api/admin/reset-data', methods=['POST'])
def reset_class_data():
    """Reset all coding data for a specific class"""
    try:
        data = request.json or {}
        class_id = data.get('classId')
        admin_key = request.headers.get('X-Admin-Key', '')
        
        # Simple admin check (use same password as instructor)
        if admin_key != 'instructor123':
            return jsonify({'error': 'Unauthorized'}), 401
        
        if not class_id:
            return jsonify({'error': 'Class ID required'}), 400
        
        conn = get_db()
        cursor = conn.cursor()
        
        # Delete highlights and codes for this class
        cursor.execute('DELETE FROM highlights WHERE class_id = ?', (class_id,))
        cursor.execute('DELETE FROM codes WHERE class_id = ?', (class_id,))
        
        # Optionally delete students (if keepStudents is False)
        if not data.get('keepStudents', True):
            cursor.execute('DELETE FROM students WHERE class_id = ?', (class_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True, 'message': f'Class {class_id} data reset successfully'})
    
    except Exception as e:
        print(f'Error resetting data: {e}')
        return jsonify({'error': 'Failed to reset data'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    print(f'Starting server on port {port}')
    print(f'Database: {DB_PATH}')
    app.run(host='0.0.0.0', port=port, debug=False)


# Qualitative Coding Comparison Tool

A web-based platform for teaching qualitative research methods where students can code interview transcripts and compare their work with classmates in real-time.

## Features

- **Multiple Interviews**: Work with multiple interview transcripts
- **Horizontal & Vertical Coding**: Code within interviews and apply the same codes across interviews
- **Interactive Coding**: Highlight text and assign codes/themes with color coding
- **Code Management**: View, edit, and delete codes with visual code list showing per-interview counts
- **Class Comparison**: See heat maps and statistics comparing your coding with classmates
- **Instructor Dashboard**: Monitor student progress and export data
- **Auto-save**: Automatically saves your work every 30 seconds
- **Local Storage**: Works offline with browser storage backup

## Quick Start

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. **Install backend dependencies:**

```bash
cd backend
pip install -r requirements.txt
```

2. **Start the backend server:**

```bash
python app.py
```

Or on Windows:
```bash
python app.py
```

The server will run on `http://localhost:3000`

3. **Open the frontend:**

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server (install globally: npm install -g http-server)
http-server -p 8000
```

Then navigate to `http://localhost:8000`

## Usage

### For Students

1. Enter your name or student ID
2. Select an interview from the dropdown
3. Read the interview transcript on the left
4. Highlight text and assign codes/themes
5. Switch between interviews - codes are shared across interviews (vertical coding)
6. Review your codes in the right panel (shows counts per interview)
7. Click "Compare with Class" to see how your coding compares with classmates
8. Export your work as JSON if needed

### For Instructors

1. Select "Instructor" role and enter password: `instructor123`
2. View dashboard with:
   - Number of students who completed coding
   - Most common themes
   - Statistics about class coding
3. Export all data as CSV

## Project Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── app.js              # Frontend JavaScript
├── backend/
│   ├── app.py          # Flask backend server
│   ├── requirements.txt # Python dependencies
│   └── coding_data.db  # SQLite database (created automatically)
└── README.md           # This file
```

## Technical Details

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Python with Flask
- **Database**: SQLite (built-in)
- **Storage**: Browser localStorage + SQLite database

## API Endpoints

- `POST /api/submit-coding` - Submit student coding data
- `GET /api/class-data` - Get aggregated class data for comparison
- `GET /api/instructor-data` - Get instructor dashboard data
- `GET /api/export-csv` - Export all data as CSV
- `GET /api/health` - Health check

## Customization

### Change Instructor Password

Edit `app.js` and update the password check in the `handleLogin` function, or implement proper authentication in the backend.

### Modify Transcript

Edit the `SAMPLE_TRANSCRIPT` constant in `app.js`.

### Change Colors

Modify the `CODE_COLORS` array in `app.js`.

## Troubleshooting

**Backend won't start:**
- Make sure port 3000 is not in use
- Check that all dependencies are installed (`pip install -r requirements.txt` in backend folder)
- Ensure Python 3.7+ is installed (`python --version`)

**Can't connect to server:**
- Ensure backend is running on `http://localhost:3000`
- Check browser console for CORS errors
- Frontend will work with localStorage even if backend is offline

**Database errors:**
- Delete `backend/coding_data.db` to reset the database
- Make sure the backend folder has write permissions

**Python import errors:**
- Make sure you're using Python 3: `python3 app.py` (on some systems)
- Create a virtual environment: `python -m venv venv` then activate it before installing dependencies

## License

MIT


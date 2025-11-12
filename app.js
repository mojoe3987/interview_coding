// Sample transcripts
const INTERVIEWS = [
    {
        id: 'interview1',
        title: 'Interview 1: Alex on Luxury',
        content: `
<p><strong>Interviewer:</strong> So, Alex, if you had to describe your relationship with luxury… what comes to mind first?</p> <p><strong>Alex:</strong> Hmm… probably *complicated*. [laughs] I mean, I like nice things, I'm not gonna pretend otherwise. It's part motivation, part—validation, maybe? I didn't grow up with much, so when I wear something expensive now, it's like proof that… yeah, I made it somewhere. Even if it's just me reminding myself of that.</p> <p><strong>Interviewer:</strong> So it's more emotional than practical?</p> <p><strong>Alex:</strong> Yeah, yeah, definitely emotional. I tell myself it's about quality, but honestly? It's about how it makes me *feel*. Like, if I walk into a meeting in a good suit, I feel sharper, more—legit. It's kind of armor, in a way. And people notice. Or at least I think they do. [smiles] Maybe it's all in my head.</p> <p><strong>Interviewer:</strong> What kind of situations make you want to buy something new?</p> <p><strong>Alex:</strong> Ah… when I've done something big, like closing a deal, yeah. But also when I'm stressed or just bored. [laughs] It's stupid, but sometimes scrolling through watches or sneakers feels like a break. I'll say I'm "researching investment pieces," but… it's probably just dopamine shopping. I've returned more stuff than I'd admit.</p> <p><strong>Interviewer:</strong> Do you remember your first luxury purchase?</p> <p><strong>Alex:</strong> Oh yeah. A Tag Heuer. I'd just gotten promoted. I wanted something to *show* it, you know? My dad rolled his eyes—said I could've used the money for savings. But every time I look at that watch, I think, "No, this is what savings *became*." [pauses] Maybe that's rationalizing, I don't know.</p> <p><strong>Interviewer:</strong> How do you think others read your choices?</p> <p><strong>Alex:</strong> Depends who we're talking about. In finance, everyone notices. There's this… unspoken ranking. Like, oh, he's got the new Omega, okay. We don't talk about it, but we all know. Outside work, though, I tone it down. My brother once called me "a walking ad," so—yeah, learned that lesson. [laughs]</p> <p><strong>Interviewer:</strong> Ever regret a purchase?</p> <p><strong>Alex:</strong> Oh yeah. There was this leather jacket—looked great online, but when I wore it, I just felt… wrong. Like I was trying to be someone else. I told myself it was the fit, but really it was just… not *me*. Which is weird, because I thought luxury was supposed to be the most "me" version of myself.</p> <p><strong>Interviewer:</strong> Has your relationship with luxury changed over time?</p> <p><strong>Alex:</strong> I think so. I tell myself I'm more about subtlety now. [smirks] Less "look at me." But then a limited edition drops and, well… I click fast. [laughs] So maybe I'm just better at justifying it. I say "investment piece," but it's usually a rush purchase that I later convince myself was strategic.</p> <p><strong>Interviewer:</strong> And if you couldn't buy luxury anymore?</p> <p><strong>Alex:</strong> Huh… honestly, that'd sting. Not because of the stuff itself, but because of what it represents. Like… losing proof, or freedom. On good days, I don't need it. On bad days, I kind of do. [shrugs] I guess true luxury would be not *needing* luxury.</p>
        `
    },
    {
        id: 'interview2',
        title: 'Interview 2: Clara on Luxury',
        content: `
<p><strong>Interviewer:</strong> Clara, when you think of "luxury," what do you picture—or feel?</p> <p><strong>Clara:</strong> Mmm… it's not one thing. I guess—quiet. Calm. I know that sounds weird. [laughs softly] I like things that are *considered*. Not loud. When something's beautifully made, I feel… held by it, maybe? Like someone paid attention—and I want to live with that kind of attention.</p> <p><strong>Interviewer:</strong> Has that always been your view?</p> <p><strong>Clara:</strong> No, not really. In my early twenties, I think I was performing "taste." [smiles] My first job, first paychecks, I wanted to *look* like a designer. I saved up for this Céline bag—it was minimal, elegant. But if I'm honest, part of me wanted colleagues to notice it. Like, *Oh, she knows her stuff.* I told myself it was about craftsmanship. Maybe it was half and half.</p> <p><strong>Interviewer:</strong> What makes you decide to actually buy something now?</p> <p><strong>Clara:</strong> I wait. I save pictures, revisit them months later. If I still feel drawn to it, that's usually a sign. But I also… I get caught in loops. Like, I'll convince myself I'm being rational, but I'm really building a story to justify it. [laughs] "It's timeless," "It's sustainable"—I've said all that. Sometimes it's true; sometimes it's just me trying to feel okay about wanting it.</p> <p><strong>Interviewer:</strong> Do you ever feel conflicted when buying luxury?</p> <p><strong>Clara:</strong> Constantly. I care about sustainability, so I try to buy less, but then the guilt makes me choose *more expensive* things to make it feel justified. [pauses] Which is kind of the opposite of simple, isn't it? I've also resold items that didn't fit my life anymore. I call it curating, but sometimes it's just erasing the evidence. [smiles wryly]</p> <p><strong>Interviewer:</strong> How do people around you respond to your taste?</p> <p><strong>Clara:</strong> Depends. My design friends get it. My family… not so much. My mum once said, "Oh, that's lovely, dear—how much did that *cost*?" [laughs] So I wear simpler things when I visit. It's easier. But sometimes I feel like I'm hiding a part of myself. Like, why can't I just like beautiful things without it being a statement?</p> <p><strong>Interviewer:</strong> Do trends affect you at all?</p> <p><strong>Clara:</strong> Less than before, but still a bit. I scroll fashion accounts "just for inspiration," and then suddenly I'm calculating whether I can afford something. It's like I want to be above it but I'm not. [laughs] I can tell myself stories about integrity all day, but sometimes I just want the thrill of *new*.</p> <p><strong>Interviewer:</strong> How would you define "true luxury" now?</p> <p><strong>Clara:</strong> Attention. The time it takes to make something properly—and the time to notice it. Maybe also… space. Like mental space. I guess luxury is anything that lets me slow down and feel present. But, yeah, it's ironic—I talk about presence and still check resale sites at midnight. [laughs] Work in progress.</p>
        `
    }
];

// Available classes
const CLASSES = [
    { id: 'class1', name: 'Class 1' },
    { id: 'class2', name: 'Class 2' }
];

// API base URL - use Render URL in production, localhost for development
const API_BASE = 'https://interview-coding.onrender.com';

// State management
let state = {
    studentName: '',
    role: 'student',
    classId: 'class1',
    currentInterviewId: 'interview1',
    codes: [], // Shared across all interviews (vertical coding)
    highlights: {}, // Object with interviewId as key, array of highlights as value
    selectedText: null,
    autoSaveInterval: null
};

// Color palette for codes
const CODE_COLORS = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
];

let colorIndex = 0;

// Initialize color index based on existing codes
function initializeColorIndex() {
    if (state.codes.length === 0) {
        colorIndex = 0;
        return;
    }
    
    // Find the highest color index used
    const usedColors = new Set(state.codes.map(c => c.color));
    let maxIndex = -1;
    
    for (let i = 0; i < CODE_COLORS.length; i++) {
        if (usedColors.has(CODE_COLORS[i])) {
            maxIndex = i;
        }
    }
    
    // Start from the next available color
    colorIndex = (maxIndex + 1) % CODE_COLORS.length;
    
    // If all colors are used, find the first unused one
    if (usedColors.size >= CODE_COLORS.length) {
        // All colors used, just cycle through
        colorIndex = state.codes.length % CODE_COLORS.length;
    } else {
        // Find first unused color
        for (let i = 0; i < CODE_COLORS.length; i++) {
            if (!usedColors.has(CODE_COLORS[i])) {
                colorIndex = i;
                break;
            }
        }
    }
}

// Ensure all codes have colors assigned
function ensureCodeColors() {
    state.codes.forEach(code => {
        if (!code.color) {
            // Assign a color if missing
            code.color = CODE_COLORS[colorIndex % CODE_COLORS.length];
            colorIndex++;
        }
    });
    // Re-initialize color index after assigning missing colors
    initializeColorIndex();
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load saved data
    loadSavedData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize interview selector
    initializeInterviews();
    
    // Check if tutorial needed
    if (!localStorage.getItem('tutorial-seen')) {
        document.getElementById('tutorial-overlay').style.display = 'flex';
    }
    
    // Setup auto-save
    setupAutoSave();
}

function setupEventListeners() {
    // Login
    document.getElementById('start-btn').addEventListener('click', handleLogin);
    document.getElementById('role-select').addEventListener('change', (e) => {
        const passwordField = document.getElementById('instructor-password');
        passwordField.style.display = e.target.value === 'instructor' ? 'block' : 'none';
    });
    
    // Tutorial
    document.getElementById('close-tutorial').addEventListener('click', () => {
        document.getElementById('tutorial-overlay').style.display = 'none';
        localStorage.setItem('tutorial-seen', 'true');
    });
    
    // Main app
    document.getElementById('compare-btn').addEventListener('click', showComparison);
    document.getElementById('reset-btn').addEventListener('click', handleReset);
    document.getElementById('export-btn').addEventListener('click', exportMyCoding);
    document.getElementById('view-all-btn').addEventListener('click', () => {
        document.getElementById('code-details').style.display = 'none';
        // Clear highlighting in transcript
        const container = document.getElementById('transcript-content');
        container.querySelectorAll('.code-highlighted').forEach(el => {
            el.classList.remove('code-highlighted');
        });
    });
    
    // Modals
    document.getElementById('close-comparison').addEventListener('click', () => {
        document.getElementById('comparison-modal').classList.remove('active');
    });
    document.getElementById('cancel-code-btn').addEventListener('click', () => {
        document.getElementById('code-input-modal').classList.remove('active');
        document.getElementById('code-input').value = '';
        selectedCodesForPassage = new Set();
        state.selectedText = null;
    });
    document.getElementById('save-code-btn').addEventListener('click', saveCode);
    document.getElementById('add-new-code-btn').addEventListener('click', addNewCodeToList);
    document.getElementById('code-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewCodeToList();
        }
    });
    
    // Instructor view
    document.getElementById('back-to-student').addEventListener('click', () => {
        document.getElementById('instructor-view').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
    });
    document.getElementById('instructor-class-select').addEventListener('change', (e) => {
        state.classId = e.target.value;
        loadInstructorData();
    });
    document.getElementById('export-csv-btn').addEventListener('click', exportCSV);
    document.getElementById('reset-class-btn').addEventListener('click', resetClassData);
    
    // Text selection
    document.addEventListener('mouseup', handleTextSelection);
}

function handleLogin() {
    const name = document.getElementById('student-name').value.trim();
    const classId = document.getElementById('class-select').value;
    const role = document.getElementById('role-select').value;
    const password = document.getElementById('instructor-password').value;
    
    if (!name) {
        alert('Please enter your name or student ID');
        return;
    }
    
    if (role === 'instructor' && password !== 'instructor123') {
        alert('Incorrect password');
        return;
    }
    
    state.studentName = name;
    state.role = role;
    state.classId = classId;
    
    if (role === 'instructor') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('instructor-view').style.display = 'block';
        document.getElementById('instructor-class-select').value = classId;
        loadInstructorData();
    } else {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        document.getElementById('student-display').textContent = `Student: ${name} (${CLASSES.find(c => c.id === classId)?.name || classId})`;
        // Ensure codes have colors and initialize color index
        ensureCodeColors();
        initializeColorIndex();
        loadTranscript(state.currentInterviewId);
        renderCodes();
    }
    
    // Save to localStorage
    localStorage.setItem('studentName', name);
    localStorage.setItem('role', role);
    localStorage.setItem('classId', classId);
}

function loadTranscript(interviewId = null) {
    const interviewToLoad = interviewId || state.currentInterviewId;
    const interview = INTERVIEWS.find(i => i.id === interviewToLoad);
    
    if (!interview) return;
    
    state.currentInterviewId = interviewToLoad;
    
    const transcriptContent = document.getElementById('transcript-content');
    transcriptContent.innerHTML = interview.content;
    
    // Update interview selector
    updateInterviewSelector();
    
    // Restore highlights for this interview
    restoreHighlights();
    updateProgress();
}

function updateInterviewSelector() {
    const selector = document.getElementById('interview-selector');
    if (!selector) return;
    
    selector.value = state.currentInterviewId;
}

function initializeInterviews() {
    const interviewSelector = document.getElementById('interview-selector');
    if (interviewSelector) {
        interviewSelector.innerHTML = INTERVIEWS.map(interview => 
            `<option value="${interview.id}">${interview.title}</option>`
        ).join('');
        
        interviewSelector.addEventListener('change', (e) => {
            loadTranscript(e.target.value);
        });
    }
}

// Track selected codes for current passage
let selectedCodesForPassage = new Set();

function handleTextSelection() {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText.length < 3) return;
    
    const range = selection.getRangeAt(0);
    const container = document.getElementById('transcript-content');
    
    if (!container.contains(range.commonAncestorContainer)) return;
    
    // Check if selection spans multiple paragraphs (speakers)
    // This would break the HTML structure
    const startParagraph = range.startContainer.nodeType === Node.TEXT_NODE 
        ? range.startContainer.parentElement.closest('p')
        : range.startContainer.closest('p');
    const endParagraph = range.endContainer.nodeType === Node.TEXT_NODE
        ? range.endContainer.parentElement.closest('p')
        : range.endContainer.closest('p');
    
    if (!startParagraph || !endParagraph) {
        window.getSelection().removeAllRanges();
        return;
    }
    
    if (startParagraph !== endParagraph) {
        // Selection spans multiple paragraphs - not allowed
        window.getSelection().removeAllRanges();
        alert('Please select text within a single speaker\'s response. Selections cannot span across different speakers or paragraphs.');
        return;
    }
    
    // Check if selection includes speaker labels (Interviewer/Respondent/Alex/Clara)
    // Reject selections that are entirely within a <strong> tag
    let currentNode = range.startContainer;
    let isInStrongTag = false;
    
    // Walk up the DOM tree to check if we're inside a <strong> tag
    while (currentNode && currentNode !== startParagraph) {
        if (currentNode.nodeType === Node.ELEMENT_NODE && currentNode.tagName === 'STRONG') {
            isInStrongTag = true;
            break;
        }
        currentNode = currentNode.parentNode;
    }
    
    if (isInStrongTag) {
        window.getSelection().removeAllRanges();
        alert('Please select the actual response text, not the speaker label (Interviewer/Alex/Clara).');
        return;
    }
    
    // Also check if the selected text is mostly or entirely speaker label text
    const selectedTextLower = selectedText.toLowerCase();
    if (selectedTextLower.startsWith('interviewer:') || 
        selectedTextLower.startsWith('alex:') || 
        selectedTextLower.startsWith('clara:')) {
        window.getSelection().removeAllRanges();
        alert('Please select the actual response text, not the speaker label.');
        return;
    }
    
    // Store selection info
    state.selectedText = {
        text: selection.toString().trim(),
        startOffset: range.startOffset,
        startContainer: range.startContainer,
        endOffset: range.endOffset,
        endContainer: range.endContainer,
        range: range.cloneRange()
    };
    
    // Reset selected codes
    selectedCodesForPassage = new Set();
    
    // Show code input modal
    showCodeSelectionModal();
}

function showCodeSelectionModal() {
    const modal = document.getElementById('code-input-modal');
    const existingCodesList = document.getElementById('existing-codes-list');
    const selectedPreview = document.getElementById('selected-codes-preview');
    
    // Populate existing codes
    if (state.codes.length === 0) {
        existingCodesList.innerHTML = '<p class="empty-hint">No codes yet. Add a new code below.</p>';
    } else {
        existingCodesList.innerHTML = state.codes.map(code => `
            <label class="code-checkbox-item">
                <input type="checkbox" 
                       value="${code.id}" 
                       data-code-name="${escapeHtml(code.name)}"
                       onchange="toggleCodeSelection(${code.id}, this.checked)">
                <span class="code-checkbox-color" style="background-color: ${code.color}"></span>
                <span class="code-checkbox-name">${escapeHtml(code.name)}</span>
            </label>
        `).join('');
    }
    
    updateSelectedCodesPreview();
    modal.classList.add('active');
    document.getElementById('code-input').focus();
}

function toggleCodeSelection(codeId, isSelected) {
    if (isSelected) {
        selectedCodesForPassage.add(codeId);
    } else {
        selectedCodesForPassage.delete(codeId);
    }
    updateSelectedCodesPreview();
}

function updateSelectedCodesPreview() {
    const preview = document.getElementById('selected-codes-preview');
    if (selectedCodesForPassage.size === 0) {
        preview.innerHTML = '';
        preview.style.display = 'none';
        return;
    }
    
    preview.style.display = 'block';
    const selectedCodes = Array.from(selectedCodesForPassage).map(id => 
        state.codes.find(c => c.id === id)
    ).filter(Boolean);
    
    preview.innerHTML = `
        <div class="selected-codes-header">Selected Codes (${selectedCodes.length}):</div>
        <div class="selected-codes-tags">
            ${selectedCodes.map(code => `
                <span class="code-tag" style="background-color: ${code.color}20; border-left: 3px solid ${code.color}">
                    ${escapeHtml(code.name)}
                    <button onclick="removeSelectedCode(${code.id})" class="tag-remove">×</button>
                </span>
            `).join('')}
        </div>
    `;
}

function removeSelectedCode(codeId) {
    selectedCodesForPassage.delete(codeId);
    // Update checkbox
    const checkbox = document.querySelector(`input[value="${codeId}"]`);
    if (checkbox) checkbox.checked = false;
    updateSelectedCodesPreview();
}

function addNewCodeToList() {
    const codeInput = document.getElementById('code-input');
    const codeName = codeInput.value.trim();
    
    if (!codeName) {
        alert('Please enter a code name');
        return;
    }
    
    // Check if code already exists
    const existingCode = state.codes.find(c => c.name.toLowerCase() === codeName.toLowerCase());
    if (existingCode) {
        // Select existing code instead
        if (!selectedCodesForPassage.has(existingCode.id)) {
            selectedCodesForPassage.add(existingCode.id);
            const checkbox = document.querySelector(`input[value="${existingCode.id}"]`);
            if (checkbox) checkbox.checked = true;
        }
        codeInput.value = '';
        updateSelectedCodesPreview();
        return;
    }
    
    // Create new code with next available color
    // First, find which colors are already used
    const usedColors = new Set(state.codes.map(c => c.color));
    let assignedColor = null;
    
    // Try to find an unused color first
    for (let i = 0; i < CODE_COLORS.length; i++) {
        if (!usedColors.has(CODE_COLORS[i])) {
            assignedColor = CODE_COLORS[i];
            colorIndex = i + 1;
            break;
        }
    }
    
    // If all colors are used, cycle through
    if (!assignedColor) {
        assignedColor = CODE_COLORS[colorIndex % CODE_COLORS.length];
        colorIndex++;
    }
    
    const newCode = {
        id: Date.now(),
        name: codeName,
        color: assignedColor,
        segments: []
    };
    state.codes.push(newCode);
    selectedCodesForPassage.add(newCode.id);
    
    // Refresh the modal
    showCodeSelectionModal();
    
    // Check the new code
    const checkbox = document.querySelector(`input[value="${newCode.id}"]`);
    if (checkbox) checkbox.checked = true;
    
    codeInput.value = '';
    updateSelectedCodesPreview();
}

function saveCode() {
    // Check if new code was entered
    const codeInput = document.getElementById('code-input');
    const newCodeName = codeInput.value.trim();
    
    if (newCodeName) {
        addNewCodeToList();
        codeInput.value = '';
        // Don't close modal yet, let user select more codes or click save
        return;
    }
    
    // Check if any codes are selected
    if (selectedCodesForPassage.size === 0) {
        alert('Please select at least one code or add a new one');
        return;
    }
    
    if (!state.selectedText) return;
    
    // Compute absolute offsets once (same for all codes on this passage)
    const container = document.getElementById('transcript-content');
    const abs = getAbsoluteCharOffsets(state.selectedText.range, container);
    
    // Create highlights for each selected code
    const selectedCodeIds = Array.from(selectedCodesForPassage);
    const highlights = [];
    
    selectedCodeIds.forEach((codeId, index) => {
        const code = state.codes.find(c => c.id === codeId);
        if (!code) return;
        
        // Create highlight with unique ID
        const highlightId = Date.now() + index; // Ensure unique IDs
        const highlight = {
            id: highlightId,
            codeId: code.id,
            interviewId: state.currentInterviewId,
            text: state.selectedText.text,
            startOffset: state.selectedText.startOffset,
            endOffset: state.selectedText.endOffset,
            absStartOffset: abs.startChar,
            absEndOffset: abs.endChar,
            startContainer: getNodePath(state.selectedText.startContainer),
            endContainer: getNodePath(state.selectedText.endContainer)
        };
        
        code.segments.push(highlight);
        highlights.push({ highlight, code });
        
        // Store highlight by interview
        if (!state.highlights[state.currentInterviewId]) {
            state.highlights[state.currentInterviewId] = [];
        }
        state.highlights[state.currentInterviewId].push(highlight);
    });
    
    // Apply all highlights to transcript (stacked/layered)
    highlights.forEach(({ highlight, code }) => {
        applyHighlight(highlight, code.color);
    });
    
    // Clear selection
    window.getSelection().removeAllRanges();
    document.getElementById('code-input-modal').classList.remove('active');
    document.getElementById('code-input').value = '';
    selectedCodesForPassage = new Set();
    state.selectedText = null;
    
    // Update UI
    renderCodes();
    updateProgress();
    saveToLocalStorage();
    saveToServer();
}

// Compute absolute character offsets within transcript container
function getAbsoluteCharOffsets(range, container) {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    let charCount = 0;
    let startChar = null;
    let endChar = null;
    while (walker.nextNode()) {
        const node = walker.currentNode;
        const len = node.textContent.length;
        if (node === range.startContainer) {
            startChar = charCount + range.startOffset;
        }
        if (node === range.endContainer) {
            endChar = charCount + range.endOffset;
            break;
        }
        charCount += len;
    }
    return { startChar, endChar };
}

function getNodePath(node) {
    const path = [];
    let current = node;
    while (current && current !== document.getElementById('transcript-content')) {
        if (current.parentNode) {
            const index = Array.from(current.parentNode.childNodes).indexOf(current);
            path.unshift(index);
            current = current.parentNode;
        } else {
            break;
        }
    }
    return path;
}

function getNodeFromPath(path, container) {
    let node = container;
    for (const index of path) {
        if (node.childNodes[index]) {
            node = node.childNodes[index];
        } else {
            return null;
        }
    }
    return node;
}

function applyHighlight(highlight, color) {
    const container = document.getElementById('transcript-content');
    const startNode = getNodeFromPath(highlight.startContainer, container);
    const endNode = getNodeFromPath(highlight.endContainer, container);
    
    if (!startNode || !endNode) return;
    
    // Check if there's already a highlight at this exact position
    // We'll check by looking for highlights that contain the same start/end nodes and offsets
    const existingHighlights = container.querySelectorAll('.highlight');
    let existingHighlight = null;
    
    for (const existing of existingHighlights) {
        // Check if this highlight is at the same position
        const existingStart = existing.dataset.startOffset;
        const existingEnd = existing.dataset.endOffset;
        if (existingStart === highlight.startOffset.toString() && 
            existingEnd === highlight.endOffset.toString() &&
            existing.textContent.trim() === highlight.text.trim()) {
            existingHighlight = existing;
            break;
        }
    }
    
    if (existingHighlight) {
        // Add this code to existing highlight (multi-code highlight)
        const existingCodeIds = existingHighlight.dataset.codeIds ? 
            existingHighlight.dataset.codeIds.split(',').map(Number) : [];
        if (!existingCodeIds.includes(highlight.codeId)) {
            existingCodeIds.push(highlight.codeId);
            existingHighlight.dataset.codeIds = existingCodeIds.join(',');
            
            // Update visual: add another border layer (stacked borders)
            const currentBorder = existingHighlight.style.borderBottom || '';
            // Use box-shadow to show multiple colors
            const currentShadow = existingHighlight.style.boxShadow || '';
            const newShadow = currentShadow ? 
                `${currentShadow}, 0 2px 0 0 ${color}` : 
                `0 2px 0 0 ${color}`;
            existingHighlight.style.boxShadow = newShadow;
            
            // Also update background to blend colors
            const existingBg = existingHighlight.style.backgroundColor || '';
            // Mix colors (simple approach: use the lighter color)
            existingHighlight.style.backgroundColor = color + '30';
            
            // Store highlight ID mapping
            existingHighlight.dataset[`highlightId-${highlight.codeId}`] = highlight.id;
        }
        return;
    }
    
    // New highlight - create the range and span
    const range = document.createRange();
    range.setStart(startNode, highlight.startOffset);
    range.setEnd(endNode, highlight.endOffset);
    
    const span = document.createElement('span');
    span.className = 'highlight';
    span.style.backgroundColor = color + '40';
    span.style.borderBottom = `2px solid ${color}`;
    span.dataset.highlightId = highlight.id;
    span.dataset.codeId = highlight.codeId;
    span.dataset.codeIds = highlight.codeId.toString();
    span.dataset.startOffset = highlight.startOffset;
    span.dataset.endOffset = highlight.endOffset;
    span.dataset[`highlightId-${highlight.codeId}`] = highlight.id;
    
    try {
        range.surroundContents(span);
    } catch (e) {
        // Handle case where range spans multiple nodes
        const contents = range.extractContents();
        span.appendChild(contents);
        range.insertNode(span);
    }
}

function restoreHighlights() {
    // Restore highlights by finding text in the transcript
    // We'll process them in reverse order to avoid position shifts
    const container = document.getElementById('transcript-content');
    
    // Get highlights for current interview
    const currentHighlights = state.highlights[state.currentInterviewId] || [];
    
    // Sort highlights by position (if we have that info) or just process them
    const highlightsToRestore = [...currentHighlights].reverse();
    
    highlightsToRestore.forEach(highlight => {
        const code = state.codes.find(c => c.id === highlight.codeId);
        if (!code) return;
        
        // Check if already highlighted
        if (container.querySelector(`[data-highlight-id="${highlight.id}"]`)) {
            return; // Already exists
        }
        
        // Simple approach: find text and highlight first occurrence
        // Get text content without existing highlights
        const tempDiv = container.cloneNode(true);
        tempDiv.querySelectorAll('.highlight').forEach(el => {
            el.replaceWith(document.createTextNode(el.textContent));
        });
        const plainText = tempDiv.textContent;
        
        const textIndex = plainText.indexOf(highlight.text);
        if (textIndex === -1) return;
        
        // Find nodes using tree walker on original container
        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip text nodes inside highlights
                    return node.parentElement?.classList.contains('highlight') 
                        ? NodeFilter.FILTER_REJECT 
                        : NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );
        
        let charCount = 0;
        let startNode = null;
        let startOffset = 0;
        let endNode = null;
        let endOffset = 0;
        
        while (walker.nextNode()) {
            const node = walker.currentNode;
            const nodeText = node.textContent;
            const nodeLength = nodeText.length;
            
            if (startNode === null && charCount + nodeLength > textIndex) {
                startNode = node;
                startOffset = textIndex - charCount;
            }
            
            if (charCount + nodeLength >= textIndex + highlight.text.length) {
                endNode = node;
                endOffset = (textIndex + highlight.text.length) - charCount;
                break;
            }
            
            charCount += nodeLength;
        }
        
        if (startNode && endNode) {
            try {
                const range = document.createRange();
                range.setStart(startNode, Math.max(0, startOffset));
                range.setEnd(endNode, Math.min(endNode.textContent.length, endOffset));
                
                const span = document.createElement('span');
                span.className = 'highlight';
                span.style.backgroundColor = code.color + '40';
                span.style.borderBottom = `2px solid ${code.color}`;
                span.dataset.highlightId = highlight.id;
                span.dataset.codeId = highlight.codeId;
                
                range.surroundContents(span);
            } catch (e) {
                // Skip if highlighting fails
                console.warn('Could not restore highlight:', highlight.text);
            }
        }
    });
}

function renderCodes() {
    const codesList = document.getElementById('codes-list');
    
    if (state.codes.length === 0) {
        codesList.innerHTML = '<div class="empty-state"><p>No codes yet. Highlight text to create codes.</p><p class="help-text">Codes you create will be available across all interviews (vertical coding).</p></div>';
        return;
    }
    
    codesList.innerHTML = state.codes.map(code => {
        // Count segments for current interview and across all interviews
        const currentInterviewSegments = code.segments.filter(s => s.interviewId === state.currentInterviewId);
        const allSegments = code.segments.length;
        const otherInterviews = code.segments.filter(s => s.interviewId !== state.currentInterviewId).length;
        
        return `
        <div class="code-item" data-code-id="${code.id}">
            <div class="code-item-info">
                <div class="code-color" style="background-color: ${code.color}"></div>
                <div>
                    <div class="code-name" style="cursor: pointer;">${escapeHtml(code.name)}</div>
                    <div class="code-count">
                        ${currentInterviewSegments.length} in this interview
                        ${otherInterviews > 0 ? ` • ${otherInterviews} in other${otherInterviews > 1 ? 's' : ''}` : ''}
                        ${allSegments > 0 ? ` (${allSegments} total)` : ''}
                    </div>
                </div>
            </div>
            <div class="code-actions">
                <button class="code-action-btn" onclick="showCodeDetails(${code.id})">View</button>
                <button class="code-action-btn" onclick="editCode(${code.id})">Edit</button>
                <button class="code-action-btn" onclick="deleteCode(${code.id})">Delete</button>
            </div>
        </div>
    `;
    }).join('');
    
    // Add click listeners
    state.codes.forEach(code => {
        const element = document.querySelector(`[data-code-id="${code.id}"]`);
        if (element) {
            element.addEventListener('click', (e) => {
                if (!e.target.classList.contains('code-action-btn')) {
                    showCodeDetails(code.id);
                }
            });
            // Also bind directly on the code name for reliability
            const nameEl = element.querySelector('.code-name');
            if (nameEl) {
                nameEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showCodeDetails(code.id);
                });
            }
        }
    });
}

function showCodeDetails(codeId) {
    const code = state.codes.find(c => c.id === codeId);
    if (!code) return;
    
    const details = document.getElementById('code-details');
    const title = document.getElementById('code-details-title');
    const segments = document.getElementById('code-segments');
    
    title.textContent = code.name;
    title.style.borderLeftColor = code.color;
    title.style.borderLeftWidth = '4px';
    title.style.borderLeftStyle = 'solid';
    title.style.paddingLeft = '0.5rem';
    
    // Group segments by interview
    const segmentsByInterview = {};
    code.segments.forEach(seg => {
        if (!segmentsByInterview[seg.interviewId]) {
            segmentsByInterview[seg.interviewId] = [];
        }
        segmentsByInterview[seg.interviewId].push(seg);
    });
    
    segments.innerHTML = Object.keys(segmentsByInterview).map(interviewId => {
        const interview = INTERVIEWS.find(i => i.id === interviewId);
        const interviewTitle = interview ? interview.title : interviewId;
        return `
            <div class="interview-segment-group">
                <h4>${escapeHtml(interviewTitle)}</h4>
                ${segmentsByInterview[interviewId].map((seg, idx) => `
                    <div class="code-segment clickable-segment" 
                         style="border-left-color: ${code.color}"
                         data-segment-id="${seg.id}"
                         data-interview-id="${interviewId}"
                         onclick="scrollToSegment('${seg.id}', '${interviewId}')"
                         title="Click to view in transcript">
                        ${escapeHtml(seg.text)}
                        <span class="segment-hint">Click to view →</span>
                    </div>
                `).join('')}
            </div>
        `;
    }).join('');
    
    details.style.display = 'block';
    
    // Highlight all passages of this code in the transcript
    highlightCodeInTranscript(codeId);
}

function scrollToSegment(segmentId, interviewId) {
    // Switch to the correct interview if needed
    if (state.currentInterviewId !== interviewId) {
        loadTranscript(interviewId);
        // Wait a bit for transcript to load, then scroll
        setTimeout(() => scrollToSegmentInTranscript(segmentId), 100);
    } else {
        scrollToSegmentInTranscript(segmentId);
    }
}

function scrollToSegmentInTranscript(segmentId) {
    const container = document.getElementById('transcript-content');
    const highlight = container.querySelector(`[data-highlight-id="${segmentId}"]`);
    
    if (highlight) {
        // Scroll to the highlight
        highlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add a temporary pulse effect
        highlight.style.transition = 'all 0.3s';
        highlight.style.boxShadow = '0 0 10px rgba(37, 99, 235, 0.6)';
        highlight.style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            highlight.style.boxShadow = '';
            highlight.style.transform = '';
        }, 1000);
    }
}

function highlightCodeInTranscript(codeId) {
    const container = document.getElementById('transcript-content');
    
    // Remove previous highlighting
    container.querySelectorAll('.code-highlighted').forEach(el => {
        el.classList.remove('code-highlighted');
    });
    
    // Highlight all passages with this code
    // Check both direct code-id matches and codeIds that contain this code
    container.querySelectorAll('.highlight').forEach(el => {
        const codeIds = el.dataset.codeIds ? el.dataset.codeIds.split(',').map(Number) : [];
        if (codeIds.includes(codeId)) {
            el.classList.add('code-highlighted');
        }
    });
}

function editCode(codeId) {
    const code = state.codes.find(c => c.id === codeId);
    if (!code) return;
    
    const newName = prompt('Enter new code name:', code.name);
    if (newName && newName.trim()) {
        code.name = newName.trim();
        renderCodes();
        saveToLocalStorage();
        saveToServer();
    }
}

function deleteCode(codeId) {
    if (!confirm('Are you sure you want to delete this code? All highlights across all interviews will be removed.')) return;
    
    // Remove highlights from DOM for current interview
    const container = document.getElementById('transcript-content');
    container.querySelectorAll(`[data-code-id="${codeId}"]`).forEach(el => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
    });
    
    // Remove from state
    state.codes = state.codes.filter(c => c.id !== codeId);
    
    // Remove highlights from all interviews
    Object.keys(state.highlights).forEach(interviewId => {
        state.highlights[interviewId] = state.highlights[interviewId].filter(h => h.codeId !== codeId);
    });
    
    renderCodes();
    updateProgress();
    saveToLocalStorage();
    saveToServer();
}

function updateProgress() {
    const container = document.getElementById('transcript-content');
    const totalText = container.textContent.length;
    
    // Get highlights for current interview
    const currentHighlights = state.highlights[state.currentInterviewId] || [];
    let codedLength = 0;
    
    currentHighlights.forEach(highlight => {
        codedLength += highlight.text.length;
    });
    
    const percentage = totalText > 0 ? Math.round((codedLength / totalText) * 100) : 0;
    document.getElementById('progress-percentage').textContent = `${percentage}%`;
    
    // Update overall progress if element exists
    const overallProgress = document.getElementById('overall-progress');
    if (overallProgress) {
        let totalCodedLength = 0;
        let totalTextLength = 0;
        
        INTERVIEWS.forEach(interview => {
            const interviewText = interview.content.replace(/<[^>]*>/g, '').length;
            totalTextLength += interviewText;
            
            const highlights = state.highlights[interview.id] || [];
            highlights.forEach(h => {
                totalCodedLength += h.text.length;
            });
        });
        
        const overallPercentage = totalTextLength > 0 ? Math.round((totalCodedLength / totalTextLength) * 100) : 0;
        overallProgress.textContent = `Overall: ${overallPercentage}%`;
    }
}

async function showComparison() {
    const modal = document.getElementById('comparison-modal');
    modal.classList.add('active');
    
    try {
        // Fetch class data
        const response = await fetch(`${API_BASE}/api/class-data?classId=${encodeURIComponent(state.classId)}`);
        const classData = await response.json();
        // Fetch passage stats
        const pResponse = await fetch(`${API_BASE}/api/passage-stats?classId=${encodeURIComponent(state.classId)}`);
        const passageStats = await pResponse.json();

        // Calculate passage-aware overlap
        const passageOverlap = calculatePassageOverlap(passageStats);
        document.getElementById('overlap-percentage').textContent = `${passageOverlap}%`;
        document.getElementById('students-count').textContent = classData.students.length;
        
        // Render charts
        renderCodesChart(classData);
        renderTopPassages(passageStats);
        applyHeatMap(classData);
    } catch (error) {
        console.error('Error fetching class data:', error);
        document.getElementById('overlap-percentage').textContent = 'N/A';
        document.getElementById('students-count').textContent = '0';
        alert('Unable to connect to server. Make sure the backend is running.');
    }
}

function normalizeText(s) {
    return s ? s.trim().toLowerCase().replace(/\s+/g, ' ') : '';
}

function calculatePassageOverlap(passageStats) {
    const classSet = new Set((passageStats.passages || []).map(p => `${p.interviewId}::${normalizeText(p.text)}`));
    const mySegs = [];
    state.codes.forEach(code => {
        code.segments.forEach(seg => {
            mySegs.push(`${seg.interviewId}::${normalizeText(seg.text)}`);
        });
    });
    const mySet = new Set(mySegs);
    const intersection = [...mySet].filter(x => classSet.has(x)).length;
    const union = new Set([...mySet, ...classSet]).size;
    return union > 0 ? Math.round((intersection / union) * 100) : 0;
}

function renderTopPassages(passageStats) {
    const box = document.getElementById('top-passages');
    if (!box) return;
    const items = (passageStats.passages || []).slice(0, 10);
    if (items.length === 0) {
        box.innerHTML = '<p>No passage stats yet.</p>';
        return;
    }
    const maxStudents = Math.max(...items.map(p => p.students));
    box.innerHTML = items.map(p => `
        <div class="bar-item">
            <div class="bar-label">${escapeHtml(p.interviewId || '')}</div>
            <div class="bar" style="width: ${maxStudents ? (p.students / maxStudents) * 100 : 0}%">
                ${p.students} students
            </div>
        </div>
        <div class="code-segment" style="margin-top:6px">${escapeHtml(p.text)}</div>
        <div style="font-size:12px;color:#6b7280;margin-bottom:12px">
            Codes: ${p.codes.slice(0,3).map(c => `${escapeHtml(c.name)} (${c.count})`).join(', ')}
        </div>
    `).join('');
}

function calculateOverlap(classData) {
    if (classData.students.length === 0) return 0;
    
    // Get all unique codes from class
    const classCodes = new Set();
    classData.codes.forEach(code => {
        classCodes.add(code.name.toLowerCase());
    });
    
    // Get student codes
    const studentCodes = new Set(state.codes.map(c => c.name.toLowerCase()));
    
    // Calculate intersection
    const intersection = new Set([...classCodes].filter(x => studentCodes.has(x)));
    const union = new Set([...classCodes, ...studentCodes]);
    
    return union.size > 0 ? Math.round((intersection.size / union.size) * 100) : 0;
}

function renderCodesChart(classData) {
    const chart = document.getElementById('codes-chart');
    
    // Sort codes by frequency
    const sortedCodes = [...classData.codes].sort((a, b) => b.count - a.count).slice(0, 10);
    
    if (sortedCodes.length === 0) {
        chart.innerHTML = '<p>No class data available yet.</p>';
        return;
    }
    
    const maxCount = Math.max(...sortedCodes.map(c => c.count));
    
    chart.innerHTML = sortedCodes.map(code => {
        const width = (code.count / maxCount) * 100;
        return `
            <div class="bar-item">
                <div class="bar-label">${escapeHtml(code.name)}</div>
                <div class="bar" style="width: ${width}%; background-color: ${code.color || '#3b82f6'}">
                    ${code.count} students
                </div>
            </div>
        `;
    }).join('');
}

function applyHeatMap(classData) {
    // This is a simplified version - in production, you'd map text positions more accurately
    const container = document.getElementById('transcript-content');
    const allText = container.textContent;
    
    // Count frequency of each word/phrase being coded
    // For now, we'll just add a visual indicator
    container.querySelectorAll('.highlight').forEach(el => {
        el.classList.add('heatmap-highlight');
    });
}

async function loadInstructorData() {
    try {
        const currentClassId = document.getElementById('instructor-class-select')?.value || state.classId;
        const response = await fetch(`${API_BASE}/api/instructor-data?classId=${encodeURIComponent(currentClassId)}`);
        const data = await response.json();
        
        document.getElementById('instructor-students-count').textContent = data.students.length;
        document.getElementById('instructor-total-codes').textContent = data.totalCodes;
        document.getElementById('instructor-avg-codes').textContent = 
            data.students.length > 0 ? Math.round(data.totalCodes / data.students.length) : 0;
        
        // Render most common codes with color badges
        const codesList = document.getElementById('instructor-codes-list');
        if (data.topCodes && data.topCodes.length > 0) {
            codesList.innerHTML = data.topCodes.map(code => `
                <div class="instructor-list-item">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="width: 12px; height: 12px; border-radius: 2px; background-color: ${code.color || '#3b82f6'}; flex-shrink: 0;"></div>
                        <strong>${escapeHtml(code.name)}</strong>
                    </div>
                    <span>${code.count} student${code.count !== 1 ? 's' : ''}</span>
                </div>
            `).join('');
        } else {
            codesList.innerHTML = '<p>No codes created yet.</p>';
        }
        
        // Fetch and render most coded passages
        try {
            const passageResponse = await fetch(`${API_BASE}/api/passage-stats?classId=${encodeURIComponent(currentClassId)}`);
            const passageData = await passageResponse.json();
            renderInstructorTopPassages(passageData);
        } catch (passageError) {
            console.error('Error loading passage stats:', passageError);
            document.getElementById('instructor-top-passages').innerHTML = '<p>Unable to load passage statistics.</p>';
        }
        
    } catch (error) {
        console.error('Error loading instructor data:', error);
        alert('Unable to load instructor data. Make sure the backend is running.');
    }
}

function renderInstructorTopPassages(passageStats) {
    const container = document.getElementById('instructor-top-passages');
    if (!container) return;
    
    const passages = (passageStats.passages || []).slice(0, 10);
    
    if (passages.length === 0) {
        container.innerHTML = '<p>No passage statistics available yet.</p>';
        return;
    }
    
    container.innerHTML = passages.map((passage, index) => `
        <div class="instructor-passage-item" style="margin-bottom: 1.5rem; padding: 1rem; background: #f9fafb; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <div style="font-weight: 600; color: #1f2937;">
                    ${escapeHtml(passage.interviewId || 'Unknown Interview')}
                </div>
                <div style="font-size: 0.875rem; color: #6b7280;">
                    ${passage.students} student${passage.students !== 1 ? 's' : ''} coded this
                </div>
            </div>
            <div style="margin-bottom: 0.75rem; line-height: 1.6; color: #374151; padding: 0.75rem; background: white; border-radius: 4px; font-style: italic;">
                "${escapeHtml(passage.text.length > 250 ? passage.text.substring(0, 250) + '...' : passage.text)}"
            </div>
            <div style="margin-top: 0.75rem;">
                <div style="font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem; font-weight: 500;">Codes applied to this passage:</div>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${passage.codes && passage.codes.length > 0 
                        ? passage.codes.map(c => `
                            <span style="display: inline-block; padding: 0.375rem 0.75rem; background: #e5e7eb; border-radius: 6px; font-size: 0.875rem; color: #374151; border-left: 3px solid #3b82f6;">
                                ${escapeHtml(c.name)} <span style="color: #6b7280;">(${c.count})</span>
                            </span>
                        `).join('')
                        : '<span style="font-size: 0.875rem; color: #6b7280;">No codes assigned</span>'
                    }
                </div>
            </div>
        </div>
    `).join('');
}

function handleReset() {
    if (!confirm('Are you sure you want to reset? This will delete all your codes and highlights.')) return;
    
    state.codes = [];
    state.highlights = [];
    localStorage.removeItem('codingData');
    loadTranscript();
    renderCodes();
    updateProgress();
}

function exportMyCoding() {
    const data = {
        studentName: state.studentName,
        interviews: INTERVIEWS.map(interview => ({
            id: interview.id,
            title: interview.title
        })),
        codes: state.codes.map(code => ({
            name: code.name,
            color: code.color,
            segments: code.segments.map(seg => ({
                interviewId: seg.interviewId,
                text: seg.text
            }))
        }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coding-${state.studentName}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

async function exportCSV() {
    try {
        const currentClassId = document.getElementById('instructor-class-select')?.value || state.classId;
        const response = await fetch(`${API_BASE}/api/export-csv?classId=${encodeURIComponent(currentClassId)}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `class-coding-data-${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error exporting CSV:', error);
        alert('Unable to export CSV. Make sure the backend is running.');
    }
}

function saveToLocalStorage() {
    const data = {
        codes: state.codes,
        highlights: state.highlights,
        currentInterviewId: state.currentInterviewId,
        classId: state.classId
    };
    localStorage.setItem('codingData', JSON.stringify(data));
}

function loadSavedData() {
    const saved = localStorage.getItem('codingData');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            state.codes = data.codes || [];
            
            // Ensure all codes have colors assigned
            ensureCodeColors();
            // Initialize color index for future codes
            initializeColorIndex();
            
            // Handle migration from old format (array) to new format (object)
            if (Array.isArray(data.highlights)) {
                // Convert old format to new format
                state.highlights = {};
                data.highlights.forEach(highlight => {
                    const interviewId = highlight.interviewId || 'interview1'; // Default to first interview
                    if (!state.highlights[interviewId]) {
                        state.highlights[interviewId] = [];
                    }
                    state.highlights[interviewId].push(highlight);
                });
            } else {
                state.highlights = data.highlights || {};
            }
            
            if (data.currentInterviewId) {
                state.currentInterviewId = data.currentInterviewId;
            }
            if (data.classId) {
                state.classId = data.classId;
            }
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
    
    const savedName = localStorage.getItem('studentName');
    if (savedName) {
        document.getElementById('student-name').value = savedName;
    }
    
    // Load classId from localStorage or saved data
    const savedClassId = localStorage.getItem('classId') || state.classId;
    if (savedClassId) {
        state.classId = savedClassId;
        // Set class select after DOM is ready
        setTimeout(() => {
            const classSelect = document.getElementById('class-select');
            if (classSelect) {
                classSelect.value = savedClassId;
            }
        }, 0);
    }
}

async function saveToServer() {
    try {
        await fetch(`${API_BASE}/api/submit-coding`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentName: state.studentName,
                classId: state.classId,
                codes: state.codes,
                highlights: state.highlights
            })
        });
    } catch (error) {
        console.error('Error saving to server:', error);
        // Silently fail - localStorage backup is available
    }
}

async function resetClassData() {
    const currentClassId = document.getElementById('instructor-class-select')?.value || state.classId;
    const className = CLASSES.find(c => c.id === currentClassId)?.name || currentClassId;
    
    if (!confirm(`Are you sure you want to reset all coding data for ${className}? This will delete ALL codes, highlights, and student records for this class. This cannot be undone!`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/api/admin/reset-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Key': 'instructor123'
            },
            body: JSON.stringify({
                classId: currentClassId,
                keepStudents: false
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Reset failed');
        }
        
        alert(`All coding data for ${className} has been reset successfully.`);
        loadInstructorData(); // Refresh the dashboard
    } catch (error) {
        console.error('Error resetting class data:', error);
        alert('Unable to reset class data. Make sure the backend is running.');
    }
}

function setupAutoSave() {
    state.autoSaveInterval = setInterval(() => {
        saveToLocalStorage();
        saveToServer();
    }, 30000); // Every 30 seconds
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions globally available for inline handlers
window.editCode = editCode;
window.deleteCode = deleteCode;
window.scrollToSegment = scrollToSegment;
window.toggleCodeSelection = toggleCodeSelection;
window.removeSelectedCode = removeSelectedCode;


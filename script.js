const transcriptContainer = document.getElementById('transcriptContainer');
const timestampElem = document.getElementById('timestamp');

const urlParams = new URLSearchParams(window.location.search);
const transcriptId = urlParams.get('id');

if (!transcriptId) {
  transcriptContainer.textContent = 'No transcript ID provided in URL.';
} else {
  fetch(`/transcripts/transcript-${transcriptId}.html`)
    .then(res => {
      if (!res.ok) throw new Error('Transcript not found');
      return res.text();
    })
    .then(html => {
      // If transcript is full HTML, you might want to sanitize or extract text
      // For now, we’ll just insert raw HTML inside the embed description
      transcriptContainer.innerHTML = html;
      timestampElem.textContent = new Date().toLocaleString();
    })
    .catch(err => {
      transcriptContainer.textContent = err.message;
    });
}

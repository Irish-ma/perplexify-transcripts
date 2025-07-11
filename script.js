const params = new URLSearchParams(window.location.search);
const transcriptId = params.get('id');
const container = document.getElementById('transcriptContainer');

if (!transcriptId) {
  container.innerHTML = '<p>No transcript ID provided.</p>';
} else {
  fetch(`https://api.cookie-api.com/api/transcript/view?id=${transcriptId}`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.success) {
        container.innerHTML = '<p>Transcript not found.</p>';
        return;
      }

      const transcriptHTML = data.transcriptHtml || '<p>No content.</p>';
      container.innerHTML = transcriptHTML;
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = '<p>Failed to load transcript.</p>';
    });
}

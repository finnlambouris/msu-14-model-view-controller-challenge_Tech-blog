module.exports = {
  to_json: (data) => {
    return JSON.stringify(data);
  },

  post_preview: (body) => {
    const words = body.split(/\s+/);
    const previewWords = words.slice(0, Math.min(words.length, 10));
    const preview = previewWords.join(" ") + (words.length > 10 ? "..." : "");
    return preview;
  },

  equals: (id1, id2) => {
    if (id1 === id2) {
      return true;
    } else {
      return false;
    }
  }
}
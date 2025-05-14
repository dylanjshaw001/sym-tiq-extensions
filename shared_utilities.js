// =============================
// Shared Utility Functions
// =============================

window.symbiosysPIUtils = {
    isHashed: function(value) {
      return /^[a-f0-9]{64}$/i.test(value);
    },
    normalizePhone: function(phone) {
      var numeric = phone.replace(/\D+/g, '');
      if (numeric.length === 10) numeric = '1' + numeric;
      return numeric;
    },
    sha256: function(str) {
      var encoder = new TextEncoder();
      var data = encoder.encode(str.trim().toLowerCase());
      return crypto.subtle.digest('SHA-256', data).then(function(buffer) {
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      });
    }
  };
  
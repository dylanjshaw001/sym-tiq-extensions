// =============================
// Page View Tag Processing Logic
// =============================

// User-Friendly Configuration Section
var dataLayerMapping = {
    phone_user: 'phone_user',
    date_of_birth_user: 'date_of_birth_user',
    first_name_user: 'first_name_user',
    last_name_user: 'last_name_user',
    zip_code_user: 'zip_code_user',
    city_user: 'city_user',
    state_user: 'state_user'
  };
  
  (function() {
    var fields = [
      { raw: dataLayerMapping.phone_user, fallback: 'hashed_phone_user', out: ['hashed_phone_user', 'hashed_phone_e164_user'], isPhone: true },
      { raw: dataLayerMapping.date_of_birth_user, fallback: 'hashed_date_of_birth_user', out: ['hashed_date_of_birth_user'] },
      { raw: dataLayerMapping.first_name_user, fallback: 'hashed_first_name_user', out: ['hashed_first_name_user'] },
      { raw: dataLayerMapping.last_name_user, fallback: 'hashed_last_name_user', out: ['hashed_last_name_user'] },
      { raw: dataLayerMapping.zip_code_user, fallback: 'hashed_zip_code_user', out: ['hashed_zip_code_user'] },
      { raw: dataLayerMapping.city_user, fallback: 'hashed_city_user', out: ['hashed_city_user'] },
      { raw: dataLayerMapping.state_user, fallback: 'hashed_state_user', out: ['hashed_state_user'] }
    ];
  
    fields.forEach(function(field) {
      var rawValue = b[field.raw] || '';
      var hashedFallback = b[field.fallback] || '';
  
      if (!rawValue && !hashedFallback) return;
  
      if (field.isPhone) {
        if (rawValue && !window.symbiosysPIUtils.isHashed(rawValue)) {
          var normalized = window.symbiosysPIUtils.normalizePhone(rawValue);
          var e164Plus = '+' + normalized;
          Promise.all([window.symbiosysPIUtils.sha256(normalized), window.symbiosysPIUtils.sha256(e164Plus)])
            .then(function([hashNoPlus, hashWithPlus]) {
              b[field.out[0]] = hashNoPlus;
              b[field.out[1]] = hashWithPlus;
            });
        } else {
          var useValue = rawValue || hashedFallback;
          b[field.out[0]] = useValue;
          b[field.out[1]] = useValue;
          console.warn('Phone_user provided only as hashed value. Normalization cannot be verified.');
        }
      } else {
        if (rawValue && !window.symbiosysPIUtils.isHashed(rawValue)) {
          window.symbiosysPIUtils.sha256(rawValue).then(function(hash) {
            b[field.out[0]] = hash;
          });
        } else {
          b[field.out[0]] = rawValue || hashedFallback;
        }
      }
    });
  })();
  
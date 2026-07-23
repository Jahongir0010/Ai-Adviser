// Simple reusable request-body validator. `rules` is an object keyed by field
// name: { required: bool, type: 'string'|'number'|'array', min, max }.
function validateBody(rules) {
  return (req, res, next) => {
    const body = req.body || {};
    const errors = [];

    for (const [field, rule] of Object.entries(rules)) {
      const value = body[field];
      const isEmpty = value === undefined || value === null || value === '';

      if (rule.required && isEmpty) {
        errors.push(`"${field}" majburiy`);
        continue;
      }

      if (isEmpty) continue;

      if (rule.type === 'string' && typeof value !== 'string') {
        errors.push(`"${field}" satr (string) bo'lishi kerak`);
        continue;
      }

      if (rule.type === 'array' && !Array.isArray(value)) {
        errors.push(`"${field}" massiv (array) bo'lishi kerak`);
        continue;
      }

      if (rule.type === 'number') {
        const num = Number(value);
        if (Number.isNaN(num)) {
          errors.push(`"${field}" son bo'lishi kerak`);
          continue;
        }
        if (rule.min !== undefined && num < rule.min) {
          errors.push(`"${field}" kamida ${rule.min} bo'lishi kerak`);
        }
        if (rule.max !== undefined && num > rule.max) {
          errors.push(`"${field}" ko'pi bilan ${rule.max} bo'lishi kerak`);
        }
      }

      if (rule.type === 'string' && rule.maxLength !== undefined && value.length > rule.maxLength) {
        errors.push(`"${field}" ko'pi bilan ${rule.maxLength} belgidan iborat bo'lishi kerak`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    next();
  };
}

module.exports = { validateBody };

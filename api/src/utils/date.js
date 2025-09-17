function isSameUTCDate(a, b) {
    if (!a || !b) return false;
    const da = new Date(a);
    const db = new Date(b);
    return da.getUTCFullYear() === db.getUTCFullYear() &&
        da.getUTCMonth() === db.getUTCMonth() &&
        da.getUTCDate() === db.getUTCDate();
}

function isYesterday(a, b) {
    // returns true if a is one day before b (UTC)
    const da = new Date(a);
    const db = new Date(b);
    const diff = Date.UTC(db.getUTCFullYear(), db.getUTCMonth(), db.getUTCDate()) - Date.UTC(da.getUTCFullYear(), da.getUTCMonth(), da.getUTCDate());
    return diff === 24 * 60 * 60 * 1000;
}

module.exports = { isSameUTCDate, isYesterday };

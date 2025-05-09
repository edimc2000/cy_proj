class Utils {

    convertDateFormat = dateStr => {
        //  input 05/09/2025   - result Fri May 09 2025
        const [month, day, year] = dateStr.split('/').map(Number);
        const date = new Date(year, month - 1, day);

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date');
        }

        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).replace(/,/g, '');
    }
}


module.exports = new Utils()



class Utils {

    getOrdinalSuffix = day => {
        if (day >= 11 && day <= 13) {
            return 'th'
        }
        switch (day % 10) {
            case 1: return 'st'
            case 2: return 'nd'
            case 3: return 'rd'
            default: return 'th'
        }
    }

    monthNow = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date())
    
    /**
     * @param {String} dateStr  format 'MM/DD/YYYY'
     * @returns Date string with this format 'Fri May 09 2025'
     */
    convertDateFormat = dateStr => {
        //  input 05/09/2025   - result Fri May 09 2025
        const [month, day, year] = dateStr.split('/').map(Number);
        const date = new Date(year, month - 1, day)

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date')
        }

        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).replace(/,/g, '')
    }



    /**
     * @param {String} dateStr  format 'MM/DD/YYYY'
     * @returns Date string with this format 'Saturday, December 20th, 2025'
     */
    convertDateFormatv2 = dateStr => {
        //  input 05/09/2025   - result Tuesday, May 9th, 2025
        // Parse the input string (MM/DD/YYYY)
        const [month, day, year] = dateStr.split('/').map(Number)
        const date = new Date(year, month - 1, day); // month is 0-indexed

        // Get the ordinal suffix (e.g., 'th' for 9 → '9th')
        const dayWithSuffix = day + this.getOrdinalSuffix(day)

        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long', // 'short' for "May", 'long' for "May"
            year: 'numeric',
            day: "numeric",
        });

        // Replace the day number with the day + suffix
        return formattedDate.replace(/\d+/, dayWithSuffix)

    }


    
}


module.exports = new Utils()



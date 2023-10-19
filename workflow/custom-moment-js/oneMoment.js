export default class OneMoment extends Date {
    static parse(date, format) {
        const dateArray = date.split("");
        const formatArray = format.split("");
        let isoDate = "[]";
        let day = "";
        let month = "";
        let year = "";
        formatArray.forEach((value, index) => {
            switch (value) {
                case "D":
                    day += dateArray[index];
                    break;
                case "M":
                    month += dateArray[index];
                    break;
                case "Y":
                    year += dateArray[index];
                    break;
            }
        });
        isoDate = year + "-" + month + "-" + day;
        return super.parse(isoDate);
    }

    format(string) {
        let formattedDate = "";
        let separator;
        if (string.includes("/")) {
            separator = "/";
        } else if (string.includes("-")) {
            separator = "-";
        }
        string.split(separator).forEach((value) => {
            switch (value) {
                case "YYYY":
                    formattedDate += this.getFullYear();
                    formattedDate += separator;
                    break;
                case "MM":
                    formattedDate += this.getMonth();
                    formattedDate += separator;
                    break;
                case "DD":
                    formattedDate += this.getDate();
                    formattedDate += separator;
                    break;
            }
        });
        return formattedDate.slice(0, -1);
    }

    fromNow() {
        const differenceTimeValue = Date.now() - this.getTime();
        const millisecondsInDay = 86400000;
        const days = differenceTimeValue / millisecondsInDay;
        if (days >= 1) {
            return `${Math.abs(days).toFixed()} дней назад`;
        } else if (days <= -1) {
            return `через ${Math.abs(days.toFixed())} дней`;
        } else if (days > -1 && days < 1) {
            return `сегодня`;
        }
    }

    toDate() {
        return this;
    }
}
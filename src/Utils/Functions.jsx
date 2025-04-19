import { tailwindColors } from '../Utils/Colors.jsx';

export function calcPercentage(defaultValue, comparedValue) {
    return Math.max(0, Math.min(1, (comparedValue * 0.5) / defaultValue));
}

export function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = tailwindColors.primary;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

export function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = tailwindColors.primary;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

export function formatNumberWithComma(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

export function formatDate(timeDifference) {

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    // Create an Intl.RelativeTimeFormat instance
    const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });

    // Determine the appropriate unit to display
    let formattedTime;
    if (seconds < 60) {
        formattedTime = rtf.format(-seconds, 'second');
    } else if (minutes < 60) {
        formattedTime = rtf.format(-minutes, 'minute');
    } else if (hours < 24) {
        formattedTime = rtf.format(-hours, 'hour');
    } else if (days < 7) {
        formattedTime = rtf.format(-days, 'day');
    } else {
        formattedTime = rtf.format(-weeks, 'week');
    }
    return formattedTime;
}

export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export function validatePasswordLength(password) {
    const minLength = 8;
    return password.length >= minLength;
}

export function stringComparisonMatching(input1, input2) {
    if (input1 === input2) return true
    else return false
}

export function validatePhoneNumber(phoneNumber) {
    // Regular expression to match phone numbers starting with 07, 06, or 05 and consisting of 10 digits
    const phoneRegex = /^(07|06|05)\d{8}$/;
    return phoneRegex.test(phoneNumber);
}

export function areAllTrue(obj) {
    // Use Object.values to get all values of the object and check if all are true
    return Object.values(obj).every(value => value === true);
}

export function capFix(text) {
    // Trim the input and split it into words
    const words = text.trim().split(/\s+/);

    // Capitalize each word
    const capitalizedWords = words.map((word, index) => {
        if (index === 0) {
            // Capitalize the first letter of the first word
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else {
            // For other words, capitalize the first two letters
            return word.slice(0, 2).toUpperCase() + word.slice(2).toLowerCase();
        }
    });

    // Join the words back together
    return capitalizedWords.join(' ');
}

export const formatDateForSql = (date) => new Date(date).toISOString().split('T')[0];

export const getTotalSalesForDates = (salesData, dailyWidgetDate) => {

    const widgetDate = new Date(dailyWidgetDate);
    const datesToCheck = [
        formatDateForSql(new Date(widgetDate.setDate(widgetDate.getDate() - 2))),
        formatDateForSql(new Date(widgetDate.setDate(widgetDate.getDate() + 1))),
        dailyWidgetDate
    ];

    const salesMap = Object.fromEntries(
        salesData.map(({ sale_date, total_sales }) => [formatDateForSql(sale_date), total_sales])
    );

    return datesToCheck.map(date => salesMap[date] || 0);
}

export const sqlToFrenchDateDaily = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short'
    }).replace('.', '').replace(/^\d+\s(\w)/, (match, p1) => match.replace(p1, p1.toUpperCase()));
}

export const formattedPreviousDates = (dateString, number) => {
    const date = new Date(dateString);

    const NDayBefore = new Date(date);
    NDayBefore.setDate(NDayBefore.getDate() - number);

    return formatDateForSql(NDayBefore);
}

export const getFullMonthNameInFrench = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'long' });
}
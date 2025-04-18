import { tailwindColors } from "../../Utils/Colors.jsx";


export const options = {
    interaction: {
        mode: 'index',
        axis: 'x',
        intersect: false,
    },
    scales: {
        x: {
            title: {
                display: false,
                text: 'Mois',
            },
            grid: {
                display: false,
            },
            ticks: {
                color: tailwindColors.textSecoundary,
            },
        },
        y: {
            title: {
                display: false,
                text: 'Operations',
            },
            ticks: {
                display: false,
            },
        },
    },
};

export function formatPrescriptionData(prescriptions, graphWidgetBeginDate, graphWidgetEndDate) {
    // Helper function to format date as 'dd MMM yyyy' in French
    function formatDate(date) {
        return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(new Date(date));
    }

    // Convert input dates to Date objects for comparison
    const startDate = new Date(graphWidgetBeginDate);
    const endDate = new Date(graphWidgetEndDate);

    // Generate the list of dates between graphWidgetBeginDate and graphWidgetEndDate
    const datesInRange = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        datesInRange.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Initialize the result object
    const result = {
        labels: datesInRange,
        confirmed: Array(datesInRange.length).fill(0),
        received: Array(datesInRange.length).fill(0),
    };

    // Map the prescriptions data to a date-based lookup
    const prescriptionsMap = prescriptions.reduce((acc, { prescription_date, confirmed_prescriptions, total_prescriptions }) => {
        const dateFormatted = formatDate(prescription_date);
        acc[dateFormatted] = {
            confirmed: parseInt(confirmed_prescriptions, 10),
            received: total_prescriptions,
        };
        return acc;
    }, {});

    // Fill the confirmed and received arrays based on the prescriptions map
    result.labels.forEach((label, index) => {
        if (prescriptionsMap[label]) {
            result.confirmed[index] = prescriptionsMap[label].confirmed;
            result.received[index] = prescriptionsMap[label].received;
        }
    });

    return result;
}

export const data = {
    labels: [`Jan ${new Date().getFullYear()}`, `Fév ${new Date().getFullYear()}`, `Mar ${new Date().getFullYear()}`, `Avr ${new Date().getFullYear()}`, `Mai ${new Date().getFullYear()}`, `Juin ${new Date().getFullYear()}`, `Juil ${new Date().getFullYear()}`, `Août ${new Date().getFullYear()}`, `Sep ${new Date().getFullYear()}`, `Oct ${new Date().getFullYear()}`, `Nov ${new Date().getFullYear()}`, `Déc ${new Date().getFullYear()}`,],
    datasets: [
        {
            label: "Confirmed",
            data: [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null],
            borderColor: tailwindColors.primary,
            cubicInterpolationMode: 'monotone',
            pointBackgroundColor: '#FFFFFF',
            pointBorderWidth: 0,
            pointHoverBorderWidth: 2,
            pointHitRadius: 10,
            pointRadius: 0,
        },
        {
            label: "Received",
            data: [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null],
            borderColor: tailwindColors.lightShapes,
            cubicInterpolationMode: 'monotone',
            pointBackgroundColor: '#FFFFFF',
            pointBorderWidth: 0,
            pointHoverBorderWidth: 1,
            pointHitRadius: 10,
            pointRadius: 0,
        },
    ],
};
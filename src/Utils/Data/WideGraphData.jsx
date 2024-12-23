import { tailwindColors } from "../../utils/Colors.jsx";


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

export const data = {
    labels: ["Jan 2023", "Fév 2023", "Mar 2023", "Avr 2023", "Mai 2023", "Juin 2023", "Juil 2023", "Août 2023", "Sep 2023", "Oct 2023", "Nov 2023", "Déc 2023"],
    datasets: [
        {
            label: "Confirmed",
            data: [null, 301, 278, 304, 315, 345, 398, 420, 425, 452, 470, null],
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
            data: [null, 328, 302, 341, 321, 370, 402, 455, 433, 460, 488, null],
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
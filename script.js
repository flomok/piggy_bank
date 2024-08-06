document.addEventListener('DOMContentLoaded', () => {
    const coins = document.getElementById('coins');
    const progress = document.getElementById('progress');
    const timePeriod = document.getElementById('time-period');
    const currentTimeElem = document.getElementById('current-time');
    const progressPercentElem = document.getElementById('progress-percent');
    const piggyBank = document.querySelector('.piggy-bank');
    const glasses = document.getElementById('glasses');
    const lenses = document.querySelectorAll('.lens');

    const timePeriods = [
        { period: '早上通勤', start: 8 * 60, end: 9 * 60, percentage: 8 },
        { period: '上午上班', start: 9 * 60, end: 12 * 60, percentage: 30 },
        { period: '中午休息', start: 12 * 60, end: 14 * 60, percentage: 10 },
        { period: '下午上班', start: 14 * 60, end: 19 * 60, percentage: 30 },
        { period: '下午吃晚饭', start: 19 * 60, end: 20 * 60, percentage: 8 },
        { period: '晚上上班', start: 20 * 60, end: 21 * 60, percentage: 14 },
    ];

    const nightTimeStart = 21 * 60; // 21:00 in minutes
    const nightTimeEnd = 8 * 60; // 08:00 in minutes

    function updatePiggyBank() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;

        let currentPeriod;
        let progressPercent = 0;
        let accumulatedPercentage = 0;

        if (currentTime >= nightTimeStart || currentTime < nightTimeEnd) {
            // Night time period
            currentPeriod = '休息时间';
            progressPercent = 100; // Full progress for rest time
            piggyBank.style.backgroundImage = "url('https://sns-webpic-qc.xhscdn.com/202408061147/900942998d35c18a11c3a2c43ded87fb/spectrum/1040g0k030nng0dlr7g0g5n73ebb1dgfgcrclicg!nc_n_webp_mw_1')"; // Replace with your image URL
        } else {
            // Day time periods
            for (const period of timePeriods) {
                const periodDuration = period.end - period.start;
                if (currentTime >= period.start && currentTime < period.end) {
                    currentPeriod = period.period;
                    progressPercent = accumulatedPercentage + ((currentTime - period.start) / periodDuration) * period.percentage;
                    break;
                }
                accumulatedPercentage += period.percentage;
            }

            if (!currentPeriod) {
                currentPeriod = '不在工作时间';
                progressPercent = 0;
            }

            piggyBank.style.backgroundImage = "url('https://pic.chaopx.com/chao_origin_pic/23/06/29/eb987242bec513e22fa60e2e912f05d5.jpg!/fw/572/quality/90/unsharp/true/compress/true')";
        }

        coins.style.height = `${progressPercent}%`;
        progress.style.width = `${progressPercent}%`;
        timePeriod.textContent = currentPeriod;
        progressPercentElem.textContent = `完成百分比: ${progressPercent.toFixed(2)}%`;

        // 显示当前时间
        const currentTimeString = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        currentTimeElem.textContent = `当前时间: ${currentTimeString}`;
    }

    function handleMouseMove(event) {
        const rect = glasses.getBoundingClientRect();
        const lensWidth = lenses[0].offsetWidth;
        const lensHeight = lenses[0].offsetHeight;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const radius = Math.min(rect.width / 4, rect.height / 4);

        lenses.forEach((lens) => {
            const lensCenterX = centerX - lensWidth / 2;
            const lensCenterY = centerY - lensHeight / 2;
            const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
            const x = Math.cos(angle) * radius + lensCenterX;
            const y = Math.sin(angle) * radius + lensCenterY;

            lens.style.transform = `translate(${x - lensCenterX}px, ${y - lensCenterY}px)`;
        });
    }

    setInterval(updatePiggyBank, 1000); // Update every second
    updatePiggyBank();

    document.addEventListener('mousemove', handleMouseMove);
});

// 自动更新: 使用 setInterval 每秒钟更新一次进度条。每天刷新时，进度条会根据当前时间重新计算。
// 休息时间:从晚上 9 点到次日早上 8 点之间，进度条将显示为 100%（满），并且小猪的图片会切换为休息的小猪图片。请将 https://example.com/resting-piggy-bank.jpg 替换为您实际的休息小猪图片的 URL。
// 其他说明:

// handleMouseMove 函数将镜片的移动效果添加到眼镜上。
// updatePiggyBank 函数计算并更新进度条以及显示当前时间和时间段。

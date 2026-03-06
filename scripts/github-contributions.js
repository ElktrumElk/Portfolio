async function fetchContributions() {
    const query = `
   query($userName: "ElktrumElk") { 
  user(login: $userName){
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}`;

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {YOUR_TOKEN}'
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch contributions');
    }

    const data = await response.json();
    return data.data.user.contributionsCollection.contributionCalendar.weeks;
}

function renderContributions(weeks) {
    const graph = document.getElementById('contributions-graph');
    graph.innerHTML = '';

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'row';
    container.style.gap = '2px';
    container.style.flexWrap = 'wrap';

    weeks.forEach(week => {
        const weekDiv = document.createElement('div');
        weekDiv.style.display = 'flex';
        weekDiv.style.flexDirection = 'column';
        weekDiv.style.gap = '2px';

        week.contributionDays.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.style.width = '10px';
            dayDiv.style.height = '10px';
            dayDiv.style.backgroundColor = getColor(day.contributionCount);
            dayDiv.title = `${day.date}: ${day.contributionCount} contributions`;
            weekDiv.appendChild(dayDiv);
        });

        container.appendChild(weekDiv);
    });

    graph.appendChild(container);
}

function getColor(count) {
    if (count === 0) return '#ebedf0';
    if (count <= 3) return '#9be9a8';
    if (count <= 6) return '#40c463';
    if (count <= 9) return '#30a14e';
    return '#216e39';
}

(async () => {
    try {
        const weeks = await fetchContributions();
        renderContributions(weeks);
    } catch (error) {
        console.error('Error fetching contributions:', error);
        document.getElementById('contributions-graph').innerHTML = '<p>Unable to load contributions.</p>';
    }
})();
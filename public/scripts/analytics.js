function home() {
  $('#home').on('click', () => {
    document.location = '/'
  })
}

$(document).ready(() => {
  $.ajax('/analytics', { method: 'PUT' })
    .then((data) => {
      renderChart(data);
    })
  home();
});


const renderChart = (data) => {

  const labels = Object.keys(data)
  const values = labels.map(key => data[key])
  console.log(labels, values);

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
      labels: labels,
      datasets: [{
        label: "My First dataset",
        backgroundColor: ["#4A74FF", "#6D8CDC", "#90A5B9", "#B3BD97", "#D6D674", "#FAEF52"],
        borderColor: 'lightgrey',
        data: values,
      }]
    },

    // Configuration options go here
    options: {
      title: {
        display: true,
        text: 'My Analytics',
        fontSize: 40,
        fontColor: 'white'
      },
      legend: {
        labels: {
          fontSize: 20,
          fontColor: 'white'
        }
      }
    }
  });
}

const docclick = () => {
  $.ajax('/analytics', { method: 'PUT' })
    .then((data) => {
      renderChart(data);
    })
}

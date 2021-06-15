// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide Results
    document.getElementById('results').style.display = 'none';

    // Show Loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate calculateResults
function calculateResults(){

    // UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12

    // Compute Monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // Show Results
        document.getElementById('results').style.display = 'block';

        // Hide Results
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Por favor, digite os dados.')
    }

}

//Show error
function showError(error){

     // Hide Results
     document.getElementById('results').style.display = 'none';

     // Hide Results
     document.getElementById('loading').style.display = 'none';

    // Create a DIV
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add Class
    errorDiv.className = 'alert alert-danger';

    // Create Text Node and Append to Div
    errorDiv.appendChild(document.createTextNode(error))

    //  Insert error above heading
    card.insertBefore(errorDiv, heading)

    // Hide message after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert-danger').remove();
}




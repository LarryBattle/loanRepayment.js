loanRepayment.js
================

Helps you find the best way to pay off your student loans and other debt while paying the least in interest.

##Warning##
I'm not a financial expert. So the information provided by this program could be inaccurate.

##Version##
0.1

##Support##
Chrome 12+, Firefox 4+, Opera 11+, IE 7+.

##Bugs##
- Algorithm is slow for payments over 10,000.

##Usage##
1.Import loanRepayment.js

`<script src='loanRepayment.js'>`

1. Create Debt.

	`var paymentTerms = 20;
	var myLoans = [
		Loan( 3823, 0, 0.06, paymentTerms ),
		Loan( 3377, 0, 0.068, paymentTerms )
	];`

2. Calculate repayment.

	`Debt.getLoansPayments( myLoans, 2000 );
	console.log( myLoans.join( '; \n' ) );`
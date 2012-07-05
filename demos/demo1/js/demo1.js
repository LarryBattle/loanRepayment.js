/*
* Demo 1 for loanRepayment.js
*
* @author Larry Battle <bateru.com/news/contact-me>
* @info Project page - <https://github.com/LarryBattle/loanRepayment.js>
*/
var paymentTerms = 20;
var myLoans = [
	Loan( 3823, 0, 0.06, paymentTerms ),
	Loan( 3377, 0, 0.068, paymentTerms )
];
Debt.getLoansPayments( myLoans, 2000 );
console.log( myLoans.join( '; \n' ) );
# memorizethat


1. Takes input  
    1.1 if it is a url 
        1.1.1 read the contents of the page and save it in cloudant as url record
    1.2 if it is not a url 
        1.2.1 just save the contents of the input as text record
       


0. How app works

Master - Worker Model

one master takes the input and distributes it among workers


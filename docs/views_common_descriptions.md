1:
    This code lets you view all of the reservations made, with specific tables chosen in the SELECT section.
2:
    This outputs the restaurants with the most reservations. subquery keeps all restaurants and attaches reservations to each restaurant, and >= ALL returns the greatest value from the set, set made up of the total reservations from each restaurant.
3:
    Outputs reservations where the number of people are greater than the average reservation size at the same restaurant. Compares outer Reservation ID to sub Reservation ID, and if they match, it will return row if the number of people is greater than the average number of people per reservation at said restuarant.
4:
    This outputs the total number of reservations for each store in the database as well. It Left Joins (Reservation as left table) the Restaurant and Reservation tables on the Restaurant ID, and Right Joins (Restaurant as right table), and Unions the result to simulate a full join.
5:
    This collects all of the emails from both the Customer and Restaurant tables. 'Customer' is the value in the "source" column to identify the email as belonging to a customer, and the same is done for restaurant. The final output is a table with two columns, one storing all of the emails, and the "source" column identifying whether the email belongs to a customer or a restaurant. 
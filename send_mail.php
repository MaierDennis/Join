<?php

########### CONFIG ###############

// $recipient = 'niclas.michel@gmail.com';
$redirect = 'success_forget_pw.html';

########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $email = $_POST['email']; //getting the email from the form and put it in a variable

        $message = "Hello,\n
        \nFollow this link to reset the password for your Join account.\n
        \nhttps://gruppe-400.developerakademie.net/reset_password.html?email=".$email."\n
        \nIgnore this email if you did not ask to reset your password.\n
        \nThank you\n
        \nJoin team\n";

        $recipient = $email;
        $subject = "Join - Reset password";
        $headers = "From:  noreply@join.de";

        mail($recipient, $subject, $message, $headers);
        
        header("Location: " . $redirect); 

        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}

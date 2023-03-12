<?php
$curl = curl_init('node-con:2684/Get_AllIPs');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($curl);
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Proof - API</title>
        <link rel='icon' href='./assets/Proof_Icon32x32.png' sizes='32x32'>
        <link rel='stylesheet' href="./styles/index.css"/>
        <script type='text/javascript' src='./scripts/index.js'></script>  
    </head>
    <body>
        <div id='SideMenu-Bar'>
            <div id='SideMenu-Item-Icon'>
                <a href='https://proof.com.br/'>
                    <img src='https://www.proof.com.br/wp-content/uploads/2018/12/PROOF_Site-Logo_SVG_Prancheta-1.svg' alt='Proof Logo' width='93' height='43'>
                </a>
            </div>
        </div>
        <center>
            <div id='Menu-Main'>
                <h4>Proof API - Tor IPs</h4>
                <form method='POST' action='./Ban_IP.php'>
                    <label for='API_IP'>Banir IP:</label><br>
                    <input type='text' name='API_IP' placeholder='192.168.100.1'><br>
                    <input type='submit' value='Enviar'><br>
                </form><br>
                <button class='API_Button' onclick='Get_AllIPs()'>Mostrar todos os Ips</button>
                <button class='API_Button' onclick='Get_IPs()'>Mostrar os ip</button>
            </div>
        <span id='API_IPsList'><?php
        echo($result);
        ?></span>
        </center>
    </body>
</html>
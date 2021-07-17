<!DOCTYPE html>
<html>
    <head>
        <title>Proof - API</title>
        <link rel='icon' href='./assets/Proof_Icon32x32.png' sizes='32x32'>
        <link rel='stylesheet' href="./styles/index.css"/>
    </head>
    <body>
        <div id='SideMenu-Bar'>
            <div id='SideMenu-Item-Icon'>
                <a href='http://127.0.0.1/'>
                    <img src='https://www.proof.com.br/wp-content/uploads/2018/12/PROOF_Site-Logo_SVG_Prancheta-1.svg' alt='Proof Logo' width='93' height='43'>
                </a>
            </div>
        </div>
        <div id='Menu-Main'>
            <center>
                <h4>Proof API - Tor IPs</h4>
                <form action= '<?php
                ?>' method='POST'>
                    <label for='API_Ip'>Banir IP:</label><br>
                    <input type='text' name='API_Ip' placeholder='192.168.100.1'><br>
                    <input type='submit' name='submit' value='Enviar'>
                </form>
                <button>Mostrar todos os Ips.</button>
                <button>Mostrar os ip.</button>
            </center>
        </div>
    </body>
</html>
<!DOCTYPE html>
<html>
    <head>
        <title>Proof - API</title>
        <link rel='icon' href='./assets/Proof_Icon32x32.png' sizes='32x32'>
        <link rel='stylesheet' href="./styles/index.css"/>
        <script type='text/javascript' src='scripts/index.js'></script>
    </head>
    <body>
        <div id='SideMenu-Bar'>
            <div id='SideMenu-Item-Icon'>
                <a href='http://127.0.0.1/'>
                    <img src='https://www.proof.com.br/wp-content/uploads/2018/12/PROOF_Site-Logo_SVG_Prancheta-1.svg' alt='Proof Logo' width='93' height='43'>
                </a>
            </div>
        </div>
        <center>
            <div id='Menu-Main'>
                <h4>Proof API - Tor IPs</h4>
                    <label for='API_Ip'>Banir IP:</label><br>
                    <input type='text' id='Input_API_IP' placeholder='192.168.100.1'><br>
                    <button class='API_Button' onclick='Ban_IP()'>Enviar</button><br>
                <span id='API_BanResult'></span><br>
                <button class='API_Button' onclick='Get_AllIPs()'>Mostrar todos os Ips</button>
                <button class='API_Button' onclick='Get_IPs()'>Mostrar os ip</button>
            </div>
        <span id='API_IPsList'></span>
        </center>
    </body>
</html>
import { _clientURL } from 'src/utils/constants';

export const passwordTemplate = (text: string) => {
  const parts = text.split('/');
  const name = parts[0];
  const password = parts[1];
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Orbit</title>
    <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
    <table role="presentation"
        style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
        <tbody>
            <tr>
                <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                    <table role="presentation"
                        style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                        <tbody>
                            <tr>
                                <td style="padding: 40px 0px 0px;">
                                    <div style="text-align: left;">
                                        <div style="padding-bottom: 20px;"><img src="https://i.ibb.co/Qbnj4mz/logo.png"
                                                alt="Company" style="width: 56px;"></div>
                                    </div>
                                    <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                                        <div style="color: rgb(0, 0, 0); text-align: center;">
                                            <h1 style="margin: 1rem 0">Bienvenido ${name}</h1>
                                            <p style="padding-bottom: 16px">Thank you for signing up to Orbit. We're
                                                really happy to have you onboard!<br>Tu contraseña
                                                es: <strong>${password}</strong><br>Da clic en en enlace de abajo para
                                                iniciar sesión.
                                            </p>
                                            <p style="padding-bottom: 16px"><a href="${_clientURL}" target="_blank"
                                                    style="padding: 12px 24px; border-radius: 4px; color: #FFF; background: #3F8EE9;display: inline-block;margin: 0.5rem 0; text-decoration: none;">
                                                    Entra a tu cuenta</a></p>
                                            <p style="padding-bottom: 16px">Best regards,</p>
                                            <p style="padding-bottom: 16px">Sally Ride<br><span style="color: #999">CEO
                                                    and Founder</span><br><span style="color: #999">The Orbit
                                                    team</span></p>
                                        </div>
                                    </div>
                                    <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                                        <p style="padding-bottom: 16px">Karimnot © <a
                                                href="https://karimnot.com/public">karimnot.com</a> 2023.</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
  `;
};
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import logging

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.smtp_host = os.getenv('SMTP_HOST', 'localhost')
        self.smtp_port = int(os.getenv('SMTP_PORT', '1025'))
        self.smtp_user = os.getenv('SMTP_USER', '')
        self.smtp_password = os.getenv('SMTP_PASSWORD', '')
        self.contact_email = os.getenv('CONTACT_EMAIL', 'contact@espaceagenda.fr')
        self.use_tls = os.getenv('SMTP_USE_TLS', 'false').lower() == 'true'

    def send_contact_notification(self, name: str, email: str, phone: Optional[str], subject: str, message: str) -> bool:
        """Envoie une notification email à l'équipe pour un nouveau contact"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'Nouveau contact : {subject}'
            msg['From'] = self.contact_email
            msg['To'] = self.contact_email

            # Version HTML
            html_content = f"""
            <html>
              <head>
                <style>
                  body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                  .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                  .header {{ background-color: #0c4a6e; color: white; padding: 20px; text-align: center; }}
                  .content {{ background-color: #f9fafb; padding: 20px; }}
                  .field {{ margin-bottom: 15px; }}
                  .label {{ font-weight: bold; color: #0c4a6e; }}
                  .value {{ margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #b45309; }}
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2>Nouveau message de contact</h2>
                  </div>
                  <div class="content">
                    <div class="field">
                      <div class="label">Nom :</div>
                      <div class="value">{name}</div>
                    </div>
                    <div class="field">
                      <div class="label">Email :</div>
                      <div class="value">{email}</div>
                    </div>
                    <div class="field">
                      <div class="label">Téléphone :</div>
                      <div class="value">{phone or 'Non renseigné'}</div>
                    </div>
                    <div class="field">
                      <div class="label">Sujet :</div>
                      <div class="value">{subject}</div>
                    </div>
                    <div class="field">
                      <div class="label">Message :</div>
                      <div class="value">{message}</div>
                    </div>
                  </div>
                </div>
              </body>
            </html>
            """

            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)

            # Envoi de l'email
            self._send_email(msg)
            logger.info(f"Email de notification envoyé pour le contact de {name}")
            return True

        except Exception as e:
            logger.error(f"Erreur lors de l'envoi de l'email de notification: {str(e)}")
            return False

    def send_contact_confirmation(self, name: str, email: str) -> bool:
        """Envoie un email de confirmation automatique au client"""
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = 'Votre message a bien été reçu - Espace Agenda'
            msg['From'] = self.contact_email
            msg['To'] = email

            html_content = f"""
            <html>
              <head>
                <style>
                  body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                  .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                  .header {{ background-color: #0c4a6e; color: white; padding: 20px; text-align: center; }}
                  .content {{ padding: 30px; background-color: #f9fafb; }}
                  .footer {{ padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }}
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2>Espace Agenda</h2>
                  </div>
                  <div class="content">
                    <p>Bonjour {name},</p>
                    <p>Nous avons bien reçu votre message et nous vous en remercions.</p>
                    <p>Notre équipe reviendra vers vous dans les plus brefs délais, généralement sous 24 heures ouvrées.</p>
                    <p>En attendant, n'hésitez pas à consulter notre site pour découvrir toutes les fonctionnalités d'Espace Agenda.</p>
                    <p>Cordialement,<br><strong>L'équipe Espace Agenda</strong></p>
                  </div>
                  <div class="footer">
                    <p>Espace Agenda - Solution de prise de rendez-vous en ligne<br>
                    42 rue de Tauzia, 33800 Bordeaux<br>
                    06 11 01 60 54 | contact@espaceagenda.fr</p>
                  </div>
                </div>
              </body>
            </html>
            """

            html_part = MIMEText(html_content, 'html')
            msg.attach(html_part)

            self._send_email(msg)
            logger.info(f"Email de confirmation envoyé à {email}")
            return True

        except Exception as e:
            logger.error(f"Erreur lors de l'envoi de l'email de confirmation: {str(e)}")
            return False

    def _send_email(self, msg: MIMEMultipart):
        """Méthode interne pour envoyer l'email via SMTP"""
        try:
            if self.use_tls:
                server = smtplib.SMTP(self.smtp_host, self.smtp_port)
                server.starttls()
            else:
                server = smtplib.SMTP(self.smtp_host, self.smtp_port)
            
            if self.smtp_user and self.smtp_password:
                server.login(self.smtp_user, self.smtp_password)
            
            server.send_message(msg)
            server.quit()
            
        except Exception as e:
            logger.error(f"Erreur SMTP: {str(e)}")
            raise


email_service = EmailService()

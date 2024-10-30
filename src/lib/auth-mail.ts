import {createTransport} from "nodemailer";

const sendVerificationRequest = async (params: {
    identifier: string;
    url: string;
    provider: any;
}) => {
    const {identifier, url, provider} = params;
    const {host} = new URL(url);
    const transport = createTransport(provider.server);
    const result = await transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: `Sign in to ${host}`,
        text: text({url, host}),
        html: html({url, host}),
    });
    // @ts-expect-error" pending is not defined
    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if (failed.length) {
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    }
};

function html(params: { url: string; host: string }) {
    const {url, host} = params;

    const escapedHost = host.replace(/\./g, "&#8203;.");

    return `
<body>
  <table>
    <tr>
      <td>
        Hallo, hier spricht <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td>
        <table>
          <tr>
            <td>
            <a href="${url}"
                target="_blank">
                Einloggen
            </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td>
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({url, host}: { url: string; host: string }) {
    return `Hier einloggen: ${host}\n${url}\n\n`;
}

export default sendVerificationRequest;

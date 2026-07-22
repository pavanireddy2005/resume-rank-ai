import dns from "node:dns";

const GOOGLE_DNS = ["8.8.8.8", "8.8.4.4"];

const configureDNS = () => {
  const currentServers = dns.getServers();

  // Switch DNS only if localhost DNS is detected
  if (currentServers.includes("127.0.0.1")) {
    console.warn("⚠️ Local DNS detected. Switching to Google DNS...");
    dns.setServers(GOOGLE_DNS);
  }

  console.log("✅ Active DNS Servers:", dns.getServers());
};

configureDNS();
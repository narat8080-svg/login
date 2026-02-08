
// CRC16-CCITT calculation for EMVCo
function crc16(data: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < data.length; i++) {
    let c = data.charCodeAt(i);
    crc ^= c << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  let hex = (crc & 0xFFFF).toString(16).toUpperCase();
  // Pad with leading zeros to ensure 4 chars
  if (hex.length < 4) {
    hex = '0'.repeat(4 - hex.length) + hex;
  }
  return hex;
}

// Helper to format TLV (Tag-Length-Value)
function formatTLV(tag: string, value: string): string {
  const length = value.length.toString().padStart(2, '0');
  return `${tag}${length}${value}`;
}

interface KHQRConfig {
  merchantID: string;
  merchantName: string;
  amount: number;
  currency?: 'USD' | 'KHR';
}

export function generateKHQR({ merchantID, merchantName, amount, currency = 'USD' }: KHQRConfig): string {
  // 00: Payload Format Indicator
  let qr = formatTLV('00', '01');
  
  // 01: Point of Initiation Method (12 = Dynamic, 11 = Static)
  qr += formatTLV('01', '12');

  // 29: Merchant Account Information (Bakong)
  //   00: GUI -> bakong.com.kh
  //   01: Merchant ID
  const merchantInfo = formatTLV('00', 'bakong.com.kh') + formatTLV('01', merchantID);
  qr += formatTLV('29', merchantInfo);

  // 52: Merchant Category Code (General)
  qr += formatTLV('52', '5999');

  // 53: Transaction Currency (840 = USD, 116 = KHR)
  const currencyCode = currency === 'USD' ? '840' : '116';
  qr += formatTLV('53', currencyCode);

  // 54: Transaction Amount
  qr += formatTLV('54', amount.toFixed(2));

  // 58: Country Code
  qr += formatTLV('58', 'KH');

  // 59: Merchant Name
  qr += formatTLV('59', merchantName);

  // 60: Merchant City
  qr += formatTLV('60', 'Phnom Penh');

  // 62: Additional Data Field (Optional, skipping for simplicity or adding terminal info)
  // const additionalInfo = formatTLV('07', 'PURATSITE'); // Terminal Label
  // qr += formatTLV('62', additionalInfo);

  // 63: CRC (Tag ID + Length '04')
  qr += '6304';
  
  // Calculate CRC
  const crc = crc16(qr);
  
  return qr + crc;
}

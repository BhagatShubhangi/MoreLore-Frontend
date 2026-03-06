import { UpcomingDeadline, formatDate } from './expiry';

/**
 * Export deadlines to CSV format
 */
export const exportToCSV = (deadlines: UpcomingDeadline[], filename: string = 'deadlines'): void => {
  const headers = ['Student Name', 'Document Type', 'Expiry Date', 'Days Remaining', 'Status'];
  
  const rows = deadlines.map(d => [
    d.studentName,
    d.documentType,
    formatDate(d.expiryDate),
    d.daysRemaining.toString(),
    d.status
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export deadlines to simple PDF format (using print dialog)
 */
export const exportToPDF = (deadlines: UpcomingDeadline[], title: string = 'Upcoming Deadlines'): void => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const tableRows = deadlines.map(d => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${d.studentName}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${getDocumentIcon(d.documentType)} ${d.documentType}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${formatDate(d.expiryDate)}</td>
      <td style="padding: 8px; border: 1px solid #ddd; ${getStatusColor(d.daysRemaining)}">${d.daysRemaining} days</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${d.status}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #333; margin-bottom: 10px; }
        .date { color: #666; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #4f46e5; color: white; padding: 12px 8px; text-align: left; }
        tr:nth-child(even) { background: #f9f9f9; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p class="date">Generated: ${new Date().toLocaleString()}</p>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Document</th>
            <th>Expiry Date</th>
            <th>Days Left</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
      </table>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
};

const getDocumentIcon = (type: string): string => {
  switch (type) {
    case 'Visa': return '🛂';
    case 'Passport': return '📘';
    case 'Medical Certificate': return '🩺';
    case 'Migration Card': return '📝';
    default: return '📄';
  }
};

const getStatusColor = (daysRemaining: number): string => {
  if (daysRemaining <= 0) return 'color: #dc2626; font-weight: bold;';
  if (daysRemaining <= 7) return 'color: #dc2626;';
  if (daysRemaining <= 30) return 'color: #f59e0b;';
  return 'color: #22c55e;';
};

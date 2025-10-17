import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Kontakt</h1>
            
            <p className="text-lg text-gray-700 mb-8">
              Ako želite da naručite sliku ili vam trebaju dodatne informacije, 
              kontaktirajte me putem društvenih mreža ili email-a.
            </p>

            <div className="flex justify-center space-x-6">
              <a 
                href="https://www.instagram.com/jelisandia/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/img/instagram-logo.png" 
                  alt="Instagram" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNSIgZmlsbD0iI0YwNDA4MCIvPgo8cGF0aCBkPSJNMTIgMTYuNUExLjUgMS41IDAgMSAwIDEwLjUgMTVBMiAyIDAgMCAwIDEyIDE2LjVaIiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                  }}
                />
              </a>

              <a 
                href="https://www.tiktok.com/@jelisandia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/img/tiktok-logo.jpg" 
                  alt="TikTok" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNSIgZmlsbD0iIzAwMDAwMCIvPgo8cGF0aCBkPSJNMTkgNi42OWE0LjgzIDQuODMgMCAwIDEtMy43Ny00LjI1VjJoLTMuNDV2MTMuNjdhMi44OSAyLjg5IDAgMCAxLTUuMiAxLjc0IDIuODkgMi44OSAwIDAgMSAyLjMxLTQuNjQgMi45MyAyLjkzIDAgMCAxIC44OC4xM1Y5LjRhNi44NCA2Ljg0IDAgMCAwLTEtLjA1QTYuMzMgNi4zMyAwIDAgMCA1IDIwLjFhNi4zNCA2LjM0IDAgMCAwIDEwLjg2LTQuNDN2LTdhOC4xNiA4LjE2IDAgMCAwIDQuNzcgMS41MnYtMy40YTQuODUgNC44NSAwIDAgMS0xLS4xWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
                  }}
                />
              </a>

              <a 
                href="mailto:jelisandia@gmail.com" 
                className="w-16 h-16 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/img/email-logo.png" 
                  alt="Email" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNSIgZmlsbD0iI0VCMzMzMyIvPgo8cGF0aCBkPSJNMjAgNEg0Yy0xLjEgMC0xLjk5LjktMS45OSAyTDIgMThjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY2YzAtMS4xLS45LTItMi0yem0wIDRsLTggNS04LTVWNmw4IDUgOC01djJ6IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                  }}
                />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
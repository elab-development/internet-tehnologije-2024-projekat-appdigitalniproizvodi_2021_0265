import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="md:flex">
              
              <div className="md:w-1/3 p-6">
                <img 
                  src="/img/jelisaveta.jpeg" 
                  alt="Jelisaveta Nedeljković" 
                  className="w-full h-80 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                  }}
                />
              </div>
              
              
              <div className="md:w-2/3 p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Jelisaveta Nedeljković</h1>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    I started painting from an early age, quickly realizing art is destined to become a huge part of my life.
                    I began painting tiny portraits on my nails, doodling on my clothing, sketching out different scenes on wood and canvas. 
                    I quickly got interested in digital art and graphic design, so I tried making mockup product labels and 
                    packaging, soon designing liquor and syrup labels.
                  </p>
                  
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat magnam soluta possimus incidunt iure facilis rerum hic explicabo quisquam atque odit, nostrum, in ad doloribus sapiente. Officiis laboriosam aspernatur illo!
                  </p>
                </div>
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-6">
                In early 2021, I decided to create my own NFT collection of about 30 completely freehand unique characters. 
                Each character has their own personality and unlockable content. The collection's name is "The Peepsicles of the Metaverse".
              </p>
              
              <a 
                href="https://opensea.io/collection/the-peepsicles-of-the-metaverse?tab=items" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img 
                  src="/img/nfts.png" 
                  alt="The Peepsicles of the Metaverse" 
                  className="max-w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
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

export default AboutPage;

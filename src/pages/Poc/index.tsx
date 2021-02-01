import React from 'react';

const link = 'https://www.youtube.com/watch?v=tf8ehLMORVQ';

function redirect() {
     window.location.href = link;
}

const Poc: React.FC = () => {
     redirect();
     return (
          <button onClick={() => redirect()}>Clique aqui para ver o vídeo</button>
     );
}

export default Poc;
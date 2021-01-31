import React from 'react';

const link = 'https://www.youtube.com/watch?v=Q2LDobhGHm4';

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
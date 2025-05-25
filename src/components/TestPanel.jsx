import React, { useState } from 'react';

function TestCounter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>গণনা: {count}</p>
            <button onClick={() => setCount(count + 1)}>বাড়াও</button>
            <button onClick={() => setCount(count - 1)}>কমাও </button>
        </div>
    );
}

export default TestCounter;

import axios from 'axios';

const test = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/inquiries', {
            full_name: 'Test User',
            phone: '1234567890',
            email: 'test@example.com',
            message: 'Manual test inquiry'
        });
        console.log('Success:', res.data);
    } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
    }
};

test();

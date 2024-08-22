import axios from 'axios';
import cheerio from 'cheerio';

export async function getServerSideProps() {
    const url = 'https://www.drugs.com/paracetamol.html';
    
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const mainContent = $('.contentBox .contentBoxData').text().trim();

        return {
            props: {
                content: mainContent,
            },
        };
    } catch (error) {
        console.error("Error fetching data: ", error);
        return {
            props: {
                content: null,
            },
        };
    }
}
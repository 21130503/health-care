import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getServerSideProps(name: string) {
    const url = `https://www.drugs.com/${name}.html`;
    
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const mainContent = $('#container').html();

        return {
            props: {
                content: mainContent,
            },
        };
    } catch (error) {
        console.error("Error fetching data: ", error);
        return {
            props: {
                content: "No data found",
            },
        };
    }
}
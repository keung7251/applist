import Head from 'next/head'
import Link from 'next/link'

const name = 'Your Name'

import { Container } from 'react-bootstrap';

import Header from './header.js';
import Footer from './footer.js';

export default function Layout({ children, title }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                name="description"
                content="By using HTML, CSS, React.JS create a single page web application that redesign the
                App Store listing page."
                />
                <meta name="og:title" content={title} />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
            </Head>

            <Header />


            <main>
                <Container fluid style={{padding: 5}}>
                    {children}
                </Container>
            </main>

            <Footer />
        </>
    )
}
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Theme } from '../types';

const ContactPage: React.FC = () => {
    const { theme } = useTheme();

    const themeStyles = {
        [Theme.MINIMALIST]: {
            container: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
            title: 'text-4xl font-bold text-gray-900 mb-4',
            text: 'text-lg text-gray-700',
            formContainer: 'mt-8 bg-white p-8 border border-gray-200 rounded-lg',
            input: 'w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition',
            button: 'bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors',
        },
        [Theme.DARK]: {
            container: 'w-full px-4 sm:px-6 lg:px-8 py-8',
            title: 'text-5xl font-bold text-white mb-6 font-lora',
            text: 'text-xl text-gray-300',
            formContainer: 'mt-10 bg-gray-800 p-8 border border-gray-700 rounded-md',
            input: 'w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition',
            button: 'bg-indigo-500 text-white font-bold py-3 px-8 rounded-md hover:bg-indigo-600 transition-colors',
        },
        [Theme.COLORFUL]: {
            container: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center',
            title: 'text-6xl text-pink-800 mb-6',
            text: 'text-2xl text-purple-800 font-inter',
            formContainer: 'mt-10 bg-white/60 p-10 rounded-2xl shadow-lg',
            input: 'w-full p-4 text-lg border-2 border-pink-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition font-inter',
            button: 'bg-pink-500 text-white font-bold py-3 px-12 rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all shadow-lg',
        },
    };

    const styles = themeStyles[theme];

    return (
        <div className={`${styles.container} page-container`}>
            <h1 className={styles.title}>Get In Touch</h1>
            <p className={styles.text}>We'd love to hear from you!</p>
            
            <div className={styles.formContainer}>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input type="text" id="name" placeholder="Your Name" className={styles.input} />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="email" id="email" placeholder="Your Email" className={styles.input} />
                    </div>
                    <div>
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea id="message" rows={5} placeholder="Your Message" className={styles.input}></textarea>
                    </div>
                    <div className="text-center">
                        <button type="submit" className={styles.button}>Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
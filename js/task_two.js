fetchPosts(); 

async function fetchPosts() {

    const postsContainer = document.getElementById('posts-container');

    try {   
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Using the API
        
        if(!response.ok){ // Creating error message
            throw new Error("Could not fetch data"); 
        }

        const data = await response.json(); // Wait for the JSON data

        // Creating posts containers
        data.forEach(post => {
            const { title, body } = post;

            // Creating a post container for each post
            const postsData = document.createElement('div');
            postsData.classList.add('posts-box');

            // Updating the HTML
            postsData.innerHTML = `
                <h3>${title}</h3>
                <p>${body}</p>
            `;

            postsContainer.appendChild(postsData);
        });
        

    }
    catch(error){
        console.error(error);
    }
    
}

// Detecting scrolling, and calling for more data when scrolling to the bottom of the page
window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100){
        fetchPosts()
    }
})
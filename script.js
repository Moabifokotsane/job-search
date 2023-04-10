const form = document.querySelector('form');

const input = document.querySelector('#search');

const jobsDiv = document.querySelector('#jobs');

form.addEventListener('submit', (e) => {

	e.preventDefault();	jobsDiv.innerHTML = '';

	const query = input.value;

	const url = `https://www.linkedin.com/jobs/search/?keywords=${query}&location=United%20States&trk=guest_job_search_jobs-search-bar_search-submit&redirect=false&position=1&pageNum=0`;

	

	fetch(url)

		.then(response => response.text())

		.then(data => {

			const parser = new DOMParser();

			const html = parser.parseFromString(data, 'text/html');

			const jobs = html.querySelectorAll('.result-card');

			jobs.forEach(job => {

				const jobTitle = job.querySelector('.result-card__title').innerText;

				const jobCompany = job.querySelector('.result-card__subtitle').innerText;

				const jobLocation = job.querySelector('.job-result-card__location').innerText;

				const jobLink = job.querySelector('.result-card__full-card-link').href;

				const jobElement = `

					<div class="job">

						<h2>${jobTitle}</h2>

						<p>${jobCompany}</p>

						<p>${jobLocation}</p>

						<a href="${jobLink}" target="_blank">View job</a>

					</div>

				`;

				jobsDiv.insertAdjacentHTML('beforeend', jobElement);

			});

		})

		.catch(error => console.error(error));

});

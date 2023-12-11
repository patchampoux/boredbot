class BoredBot {
	constructor() {
		this.initDOMElements();
		this.addEventListeners();
	}

	initDOMElements() {
		this.$ideaOutlet = this.getElement('#idea-outlet');
		this.$getIdeaButton = this.getElement('#get-idea-button');
	}

	getElement(selector) {
		const $element = document.querySelector(selector);

		if (!$element) {
			console.error(`Element with selector "${selector}" not found.`);
		}

		return $element;
	}

	addEventListeners() {
		this.$getIdeaButton?.addEventListener('click', () => this.getActivity());
	}

	async getActivity() {
		this.$getIdeaButton.textContent = 'Thinking...';
		this.$getIdeaButton.disabled = true;
		this.$getIdeaButton.setAttribute('aria-disabled', true);

		try {
			const response = await fetch('https://www.boredapi.com/api/activity/');

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();

			this.updateUI(data);
		} catch (err) {
			console.error(err);

			this.updateUI(null);
		}
	}

	updateUI(activity) {
		const result = activity?.activity || 'Something went wrong, no activity found...';

		this.$getIdeaButton.textContent = Boolean(activity?.activity) ? 'Next!' : 'Try Again?';
		this.$getIdeaButton.disabled = false;
		this.$getIdeaButton.setAttribute('aria-disabled', false);

		this.$ideaOutlet.innerHTML = `<p>${result}</p>`;
	}
}

new BoredBot();

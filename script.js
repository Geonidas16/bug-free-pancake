// Toggle module content visibility
const toggles = document.querySelectorAll('.module-toggle');
const contents = document.querySelectorAll('.module-content');

toggles.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const content = contents[index];
    const isVisible = content.style.display === 'block';
    content.style.display = isVisible ? 'none' : 'block';

    // Update progress
    const completedModules = Array.from(contents).filter(c => c.style.display === 'block').length;
    const progress = (completedModules / contents.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
  });
});
// Modal Logic
const completeBtn = document.getElementById('completeLessonBtn');
const modal = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');

completeBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Optional: Close modal by clicking outside the box
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// Quiz Logic
const quizForm = document.getElementById('quizForm');
const resultBox = document.getElementById('quizResult');

quizForm.addEventListener('submit', function(e) {
  e.preventDefault();

  let score = 0;
  const total = 3;

  const answers = {
    q1: 'b',
    q2: 'b',
    q3: 'c'
  };

  const formData = new FormData(quizForm);

  for (let key in answers) {
    if (formData.get(key) === answers[key]) {
      score++;
    }
  }

  resultBox.classList.remove('hidden', 'incorrect');

  if (score === total) {
    resultBox.textContent = `✅ Perfect! You scored ${score} out of ${total}.`;
  } else {
    resultBox.textContent = `You scored ${score} out of ${total}. Review the lesson and try again.`;
    resultBox.classList.add('incorrect');
  }
});

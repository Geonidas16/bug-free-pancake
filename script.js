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

const quizForm = document.getElementById('quizForm');
const resultBox = document.getElementById('quizResult');

quizForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let score = 0;
  const total = 3;

  const answers = {
    q1: 'b',
    q2: 'b',
    q3: 'c'
  };

  const answerText = {
    q1: '15 days',
    q2: 'After 10 unexplained absences or patterns',
    q3: 'A parent provided a medical note'
  };

  const formData = new FormData(quizForm);

  // Loop through each question
  for (let key in answers) {
    const questionBlock = document.querySelector(`.quiz-question[data-question="${key}"]`);
    const feedback = questionBlock.querySelector('.feedback');
    const userAnswer = formData.get(key);

    // Clear previous feedback
    feedback.textContent = '';
    feedback.className = 'feedback';

    if (userAnswer === answers[key]) {
      score++;
      feedback.textContent = '✅ Correct';
      feedback.classList.add('correct-answer');
    } else if (!userAnswer) {
      feedback.textContent = `❌ No answer selected. Correct: ${answerText[key]}`;
      feedback.classList.add('incorrect-answer');
    } else {
      feedback.textContent = `❌ Incorrect. Correct answer: ${answerText[key]}`;
      feedback.classList.add('incorrect-answer');
    }
  }

  resultBox.classList.remove('hidden', 'incorrect');

  if (score === total) {
    resultBox.textContent = `✅ Excellent! You got all ${score} out of ${total} correct.`;
  } else {
    resultBox.textContent = `You scored ${score} out of ${total}. Review the feedback above and try again.`;
    resultBox.classList.add('incorrect');
  }
});


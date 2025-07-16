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
  const questions = document.querySelectorAll('.quiz-question');

  questions.forEach((question) => {
    const key = question.dataset.question;
    const correctValue = question.dataset.answer;
    const correctText = question.dataset.correctText;
    const feedback = question.querySelector('.feedback');
    const selected = quizForm.querySelector(`input[name="${key}"]:checked`);

    feedback.textContent = '';
    feedback.className = 'feedback';

    if (selected && selected.value === correctValue) {
      score++;
      feedback.textContent = '✅ Correct';
      feedback.classList.add('correct-answer');
    } else if (!selected) {
      feedback.textContent = `❌ No answer selected. Correct: ${correctText}`;
      feedback.classList.add('incorrect-answer');
    } else {
      feedback.textContent = `❌ Incorrect. Correct answer: ${correctText}`;
      feedback.classList.add('incorrect-answer');
    }
  });

  // Show final result
  resultBox.classList.remove('hidden', 'incorrect');
  if (score === questions.length) {
    resultBox.textContent = `✅ Excellent! You got all ${score} out of ${questions.length} correct.`;
  } else {
    resultBox.textContent = `You scored ${score} out of ${questions.length}. Review the feedback above and try again.`;
    resultBox.classList.add('incorrect');
  }
});



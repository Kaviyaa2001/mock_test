import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
interface Question {
  question: string;
  options: string[];
  answer: number;
}

const questions: Question[] = [
  {
      question: "What is the purpose of Databricks?",
      options: [
          "A cloud-based tool for managing big data and machine learning workflows.",
          "A web development framework.",
          "A version control system.",
          "A database management system."
      ],
      answer: 0
  },
  {
      question: "Which language is primarily used with Databricks?",
      options: [
          "Java",
          "Python",
          "C++",
          "JavaScript"
      ],
      answer: 1
  }
  // Add more questions as needed
];

function loadQuiz(): void {
  const quizContainer: HTMLElement | null = document.getElementById('quiz-container');
  if (!quizContainer) return;

  quizContainer.innerHTML = '';

  questions.forEach((question, index) => {
      const questionElement: HTMLDivElement = document.createElement('div');
      questionElement.classList.add('question');

      const questionTitle: HTMLHeadingElement = document.createElement('h2');
      questionTitle.innerText = question.question;
      questionElement.appendChild(questionTitle);

      const optionsList: HTMLUListElement = document.createElement('ul');
      optionsList.classList.add('options');

      question.options.forEach((option, optionIndex) => {
          const optionItem: HTMLLIElement = document.createElement('li');

          const optionLabel: HTMLLabelElement = document.createElement('label');
          const optionInput: HTMLInputElement = document.createElement('input');

          optionInput.type = 'radio';
          optionInput.name = `question${index}`;
          optionInput.value = optionIndex.toString();

          optionLabel.appendChild(optionInput);
          optionLabel.appendChild(document.createTextNode(option));
          optionItem.appendChild(optionLabel);
          optionsList.appendChild(optionItem);
      });

      questionElement.appendChild(optionsList);
      quizContainer.appendChild(questionElement);
  });
}

function showResults(): void {
  let score: number = 0;

  questions.forEach((question, index) => {
      const selectedOption: HTMLInputElement | null = document.querySelector(`input[name="question${index}"]:checked`);
      if (selectedOption && parseInt(selectedOption.value) === question.answer) {
          score++;
      }
  });

  const resultsContainer: HTMLElement | null = document.getElementById('results');
  if (resultsContainer) {
      resultsContainer.innerText = `You scored ${score} out of ${questions.length}`;
  }
}

document.getElementById('submit')?.addEventListener('click', showResults);

loadQuiz();

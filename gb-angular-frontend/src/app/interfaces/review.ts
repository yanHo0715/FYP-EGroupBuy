import {ReviewOverallScore} from './review-overall-score';

export interface Review {
  review_id: number;
  review_subject: string;
  review_content: string;
  score: number;
  poster_id: number;
  poster_username: string;
  product_id: number;
  product_title: string;
  package_id: number;
  package_name: string;
  seller_id: number;
  seller_username: string;
  post_date: string;
  status: string;
  poster_icon: string;
  review_overall_score?: ReviewOverallScore;
}

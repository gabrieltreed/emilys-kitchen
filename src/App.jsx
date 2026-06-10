import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// THEME & GLOBAL STYLES
// ============================================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Nunito:wght@400;600;700;800&family=Nunito+Sans:wght@400;600&display=swap');

    :root {
      --turquoise: #2ABFBF;
      --turquoise-dark: #1a9494;
      --turquoise-light: #e0f7f7;
      --coral: #FF6B6B;
      --coral-dark: #e04f4f;
      --coral-light: #fff0f0;
      --cream: #FFF8F0;
      --cream-dark: #f5ead8;
      --yellow: #FFD166;
      --yellow-dark: #e6b800;
      --mint: #06D6A0;
      --navy: #1a2744;
      --charcoal: #2d3748;
      --gray: #718096;
      --light-gray: #e2e8f0;
      --white: #ffffff;
      --shadow: 0 4px 20px rgba(26,39,68,0.12);
      --shadow-lg: 0 8px 40px rgba(26,39,68,0.18);
      --radius: 16px;
      --radius-sm: 8px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Nunito Sans', sans-serif;
      background: var(--cream);
      color: var(--charcoal);
      min-height: 100vh;
    }

    .app-wrapper {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 16px 80px;
    }

    /* HEADER */
    .app-header {
      background: linear-gradient(135deg, var(--navy) 0%, #2a3f6f 100%);
      padding: 20px 24px 16px;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: var(--shadow-lg);
    }

    .btn-gear-corner {
      position: absolute;
      top: 8px;
      left: 10px;
      background: none;
      border: none;
      color: rgba(255,255,255,0.35);
      font-size: 0.8rem;
      cursor: pointer;
      padding: 4px;
      line-height: 1;
      transition: color 0.2s;
      z-index: 10;
    }

    .btn-gear-corner:hover { color: rgba(255,255,255,0.75); }

    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 900px;
      margin: 0 auto;
    }

    .app-title {
      font-family: 'Pacifico', cursive;
      color: var(--yellow);
      font-size: 1.8rem;
      text-shadow: 2px 2px 0 rgba(0,0,0,0.2);
      letter-spacing: 1px;
    }

    .app-subtitle {
      font-family: 'Nunito', sans-serif;
      color: var(--turquoise-light);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-top: 2px;
    }

    .starburst {
      width: 52px;
      height: 52px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .starburst svg {
      position: absolute;
      top: 0; left: 0;
      animation: spin-slow 20s linear infinite;
    }

    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .starburst-text {
      position: relative;
      z-index: 1;
      font-size: 1.4rem;
    }

    /* HEADER ACTIONS */
    .header-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .btn-header {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 7px 14px;
      border-radius: 20px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .btn-header:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-1px);
    }

    .btn-header.coral {
      background: var(--coral);
      border-color: var(--coral);
    }

    .btn-header.coral:hover {
      background: var(--coral-dark);
    }

    .btn-header.turquoise {
      background: var(--turquoise);
      border-color: var(--turquoise);
    }

    /* FILTER TABS */
    .filter-section {
      max-width: 900px;
      margin: 0 auto;
      padding: 12px 0 0;
    }

    .filter-tabs {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }

    .filter-tab {
      background: rgba(255,255,255,0.12);
      border: 1.5px solid rgba(255,255,255,0.2);
      color: rgba(255,255,255,0.75);
      padding: 4px 11px;
      border-radius: 20px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.7rem;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .filter-tab:hover {
      background: rgba(255,255,255,0.2);
      color: white;
    }

    .filter-tab.active {
      background: var(--yellow);
      border-color: var(--yellow);
      color: var(--navy);
    }

    /* SEARCH BAR */
    .search-bar {
      margin: 16px 0 12px;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 12px 44px 12px 16px;
      border: 2px solid var(--light-gray);
      border-radius: 24px;
      font-family: 'Nunito Sans', sans-serif;
      font-size: 0.9rem;
      background: white;
      color: var(--charcoal);
      transition: border-color 0.2s;
      outline: none;
    }

    .search-input:focus {
      border-color: var(--turquoise);
    }

    .search-icon {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--gray);
      font-size: 1.1rem;
      pointer-events: none;
    }

    /* RECIPE GRID */
    .recipe-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 20px;
      margin-top: 8px;
    }

    /* RECIPE CARD */
    .recipe-card {
      background: white;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
      position: relative;
    }

    .recipe-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .card-img-area {
      height: 140px;
      background: linear-gradient(135deg, var(--turquoise-light), var(--cream-dark));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      position: relative;
      overflow: hidden;
    }

    .card-img-area img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-img-bg-pattern {
      position: absolute;
      inset: 0;
      opacity: 0.06;
      background-image: radial-gradient(circle, var(--navy) 1px, transparent 1px);
      background-size: 16px 16px;
    }

    .card-emoji {
      position: relative;
      z-index: 1;
    }

    .time-badge {
      position: absolute;
      top: 8px;
      right: 8px;
      background: var(--navy);
      color: white;
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 0.65rem;
      padding: 4px 9px;
      border-radius: 12px;
      letter-spacing: 0.5px;
    }

    .time-badge.quick { background: var(--mint); color: var(--navy); }
    .time-badge.medium { background: var(--yellow); color: var(--navy); }
    .time-badge.long { background: var(--coral); color: white; }

    .card-body {
      padding: 14px 16px 12px;
    }

    .card-title {
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      color: var(--navy);
      margin-bottom: 6px;
      line-height: 1.3;
    }

    .card-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .type-badge {
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.65rem;
      padding: 3px 9px;
      border-radius: 10px;
      letter-spacing: 0.3px;
    }

    .type-appetizer { background: #fff3e0; color: #e65100; }
    .type-main { background: #e8f5e9; color: #2e7d32; }
    .type-side { background: #e3f2fd; color: #1565c0; }
    .type-dessert { background: #fce4ec; color: #c62828; }
    .type-soup { background: #f3e5f5; color: #6a1b9a; }
    .type-salad { background: #e8f5e9; color: #388e3c; }
    .type-breakfast { background: #fff8e1; color: #f57f17; }
    .type-drink { background: #e0f7fa; color: #00695c; }
    .type-snack { background: #fafafa; color: #424242; border: 1px solid #e0e0e0; }

    .difficulty-dots {
      display: flex;
      gap: 3px;
      align-items: center;
    }

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--light-gray);
    }

    .dot.filled { background: var(--coral); }

    .card-actions {
      display: flex;
      gap: 6px;
      border-top: 1px solid var(--light-gray);
      padding-top: 10px;
    }

    .action-btn {
      flex: 1;
      background: none;
      border: 1.5px solid var(--light-gray);
      border-radius: 8px;
      padding: 6px 4px;
      font-size: 0.7rem;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      color: var(--gray);
      cursor: pointer;
      transition: all 0.15s;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .action-btn:hover { border-color: var(--light-gray); color: var(--gray); background: #f7f7f7; }
    .action-btn.active-making { border-color: var(--mint); color: #047a5c; background: #e6fdf6; }
    .action-btn.active-making:hover { border-color: var(--mint); color: #047a5c; background: #e6fdf6; }
    .action-btn.active-made { border-color: var(--mint); color: #047a5c; background: #e6fdf6; }
    .action-btn.active-made:hover { border-color: var(--mint); color: #047a5c; background: #e6fdf6; }
    .action-btn.active-list { border-color: var(--yellow-dark); color: #7a5c00; background: #fffae0; }
    .action-btn.active-list:hover { border-color: var(--yellow-dark); color: #7a5c00; background: #fffae0; }

    .action-icon { font-size: 1rem; }

    /* MODALS */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(26,39,68,0.6);
      z-index: 200;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 20px 16px;
      overflow-y: auto;
      backdrop-filter: blur(4px);
    }

    .modal {
      background: white;
      border-radius: 20px;
      width: 100%;
      max-width: 640px;
      box-shadow: 0 20px 60px rgba(26,39,68,0.3);
      overflow: hidden;
      margin: auto;
    }

    .modal-header {
      background: linear-gradient(135deg, var(--navy), #2a3f6f);
      padding: 20px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-title {
      font-family: 'Pacifico', cursive;
      color: var(--yellow);
      font-size: 1.4rem;
    }

    .modal-close {
      background: rgba(255,255,255,0.15);
      border: none;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      font-size: 1.1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }

    .modal-close:hover { background: rgba(255,255,255,0.25); }

    .modal-body {
      padding: 24px;
      max-height: 75vh;
      overflow-y: auto;
    }

    /* DETAIL VIEW */
    .detail-hero {
      height: 180px;
      background: linear-gradient(135deg, var(--turquoise-light), var(--cream-dark));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 5rem;
      position: relative;
    }

    .detail-hero img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .detail-badges {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    .detail-time-info {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .time-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .time-label {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--gray);
    }

    .time-value {
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      color: var(--navy);
      font-size: 0.95rem;
    }

    /* SERVING STEPPER */
    .serving-stepper {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--cream);
      padding: 12px 16px;
      border-radius: 12px;
      margin-bottom: 20px;
      border: 2px dashed var(--turquoise);
    }

    .stepper-label {
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      color: var(--navy);
      font-size: 0.85rem;
      flex: 1;
    }

    .stepper-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid var(--turquoise);
      background: white;
      color: var(--turquoise-dark);
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }

    .stepper-btn:hover { background: var(--turquoise); color: white; }

    .stepper-count {
      font-family: 'Pacifico', cursive;
      font-size: 1.4rem;
      color: var(--coral);
      min-width: 32px;
      text-align: center;
    }

    /* INGREDIENTS */
    .section-title {
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 0.8rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--turquoise-dark);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--turquoise-light);
    }

    .ingredient-list {
      list-style: none;
      margin-bottom: 20px;
    }

    .ingredient-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      border-radius: 8px;
      margin-bottom: 4px;
      transition: background 0.15s;
    }

    .ingredient-item:nth-child(even) { background: var(--cream); }

    .ingredient-amount {
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      color: var(--coral);
      font-size: 0.9rem;
      min-width: 80px;
    }

    .ingredient-name {
      flex: 1;
      font-size: 0.9rem;
      color: var(--charcoal);
    }

    .ingredient-note {
      font-size: 0.75rem;
      color: var(--gray);
      font-style: italic;
    }

    /* INSTRUCTIONS */
    .steps-list {
      list-style: none;
      margin-bottom: 20px;
    }

    .step-item {
      display: flex;
      gap: 14px;
      margin-bottom: 14px;
    }

    .step-num {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--navy);
      color: var(--yellow);
      font-family: 'Pacifico', cursive;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .step-text {
      font-size: 0.9rem;
      line-height: 1.6;
      color: var(--charcoal);
      padding-top: 4px;
    }

    /* FORMS */
    .form-group {
      margin-bottom: 16px;
    }

    .form-label {
      display: block;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.8rem;
      color: var(--navy);
      margin-bottom: 6px;
      letter-spacing: 0.3px;
    }

    .form-input, .form-select, .form-textarea {
      width: 100%;
      padding: 10px 14px;
      border: 2px solid var(--light-gray);
      border-radius: 10px;
      font-family: 'Nunito Sans', sans-serif;
      font-size: 0.9rem;
      color: var(--charcoal);
      background: white;
      transition: border-color 0.2s;
      outline: none;
    }

    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color: var(--turquoise);
    }

    .form-textarea { min-height: 90px; resize: vertical; }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .form-row-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--turquoise), var(--turquoise-dark));
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
    }

    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(42,191,191,0.4); }

    .btn-secondary {
      background: white;
      color: var(--navy);
      border: 2px solid var(--light-gray);
      padding: 10px 20px;
      border-radius: 12px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary:hover { border-color: var(--turquoise); color: var(--turquoise-dark); }

    .btn-danger {
      background: white;
      color: var(--coral-dark);
      border: 2px solid var(--coral);
      padding: 10px 20px;
      border-radius: 12px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-danger:hover { background: var(--coral-light); }

    .btn-row {
      display: flex;
      gap: 10px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    /* SHOPPING LIST */
    .shopping-section {
      margin-bottom: 24px;
    }

    .section-header {
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 0.85rem;
      color: var(--white);
      background: var(--turquoise);
      padding: 6px 14px;
      border-radius: 20px;
      margin-bottom: 10px;
      display: inline-block;
    }

    .shopping-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 10px;
      margin-bottom: 6px;
      background: var(--cream);
      transition: background 0.15s;
    }

    .shopping-item.checked {
      background: #f0f0f0;
    }
    .shopping-item.on-list {
      background: #e6fdf6;
      border: 1px solid #b2f0e0;
    }

    .shopping-check {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid var(--turquoise);
      cursor: pointer;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
      margin-top: 1px;
    }

    .shopping-check.checked {
      background: var(--turquoise);
      border-color: var(--turquoise);
      color: white;
      font-size: 0.7rem;
    }

    .shopping-item-text {
      flex: 1;
    }

    .shopping-amount {
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      color: var(--coral);
      font-size: 0.85rem;
    }

    .shopping-name {
      font-size: 0.9rem;
      color: var(--charcoal);
    }

    .shopping-package {
      font-size: 0.75rem;
      color: var(--gray);
      font-style: italic;
    }

    .shopping-item.checked .shopping-amount,
    .shopping-item.checked .shopping-name {
      text-decoration: line-through;
      color: var(--gray);
    }

    /* PHOTO INTAKE */
    .photo-drop-zone {
      border: 3px dashed var(--turquoise);
      border-radius: 16px;
      padding: 40px 24px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      background: var(--turquoise-light);
      margin-bottom: 16px;
    }

    .photo-drop-zone:hover, .photo-drop-zone.dragging {
      background: #c8f0f0;
      border-color: var(--turquoise-dark);
    }

    .photo-drop-icon { font-size: 3rem; margin-bottom: 8px; }

    .photo-drop-text {
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      color: var(--turquoise-dark);
      margin-bottom: 4px;
    }

    .photo-drop-sub {
      font-size: 0.8rem;
      color: var(--gray);
    }

    .photo-preview {
      max-width: 100%;
      border-radius: 12px;
      margin-bottom: 16px;
      max-height: 220px;
      object-fit: contain;
    }

    .ai-status {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-radius: 10px;
      background: var(--navy);
      color: white;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.85rem;
      margin-bottom: 16px;
    }

    .ai-spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: var(--yellow);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    /* EMPTY STATE */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: var(--gray);
    }

    .empty-icon { font-size: 4rem; margin-bottom: 12px; }

    .empty-title {
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 1.2rem;
      color: var(--navy);
      margin-bottom: 8px;
    }

    /* INGREDIENTS EDITOR */
    .ingredient-row {
      display: grid;
      grid-template-columns: 1fr 1fr auto;
      gap: 8px;
      margin-bottom: 4px;
      align-items: center;
    }

    .ingredient-row-name {
      grid-column: 1 / -1;
      margin-bottom: 10px;
    }

    .remove-btn {
      background: none;
      border: 1.5px solid var(--coral);
      color: var(--coral);
      width: 28px;
      height: 28px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }

    .remove-btn:hover { background: var(--coral); color: white; }

    .add-ingredient-btn {
      background: none;
      border: 2px dashed var(--turquoise);
      color: var(--turquoise-dark);
      padding: 8px 16px;
      border-radius: 10px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
      width: 100%;
      margin-bottom: 16px;
      transition: all 0.15s;
    }

    .add-ingredient-btn:hover { background: var(--turquoise-light); }

    /* STEPS EDITOR */
    .step-row {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }

    .step-num-label {
      font-family: 'Pacifico', cursive;
      color: var(--coral);
      font-size: 0.9rem;
      padding-top: 10px;
      min-width: 20px;
    }

    /* TOAST */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(0);
      background: var(--navy);
      color: white;
      padding: 12px 24px;
      border-radius: 24px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.85rem;
      box-shadow: var(--shadow-lg);
      z-index: 999;
      animation: toast-in 0.3s ease;
    }

    @keyframes toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(20px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    /* ATOMIC DECORATIONS */
    .atom-decoration {
      position: absolute;
      opacity: 0.07;
      pointer-events: none;
    }

    /* DIVIDER */
    .atomic-divider {
      text-align: center;
      color: var(--turquoise);
      font-size: 1rem;
      margin: 20px 0 10px;
      letter-spacing: 8px;
      opacity: 0.5;
    }

    /* API KEY NOTICE */
    .api-key-notice {
      background: var(--cream);
      border: 2px solid var(--yellow);
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 16px;
      font-size: 0.82rem;
      color: var(--charcoal);
      line-height: 1.5;
    }

    .api-key-notice strong {
      color: var(--navy);
      font-family: 'Nunito', sans-serif;
    }

    /* STATUS INDICATOR */
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.7rem;
      padding: 4px 10px;
      border-radius: 12px;
    }

    .status-making { background: var(--coral-light); color: var(--coral-dark); }
    .status-made { background: #e6fdf6; color: #047a5c; }

    /* PALETTES */
    .palette-atomic-teal {
      --turquoise: #2ABFBF; --turquoise-dark: #1a9494; --turquoise-light: #e0f7f7;
      --coral: #FF6B6B; --coral-dark: #e04f4f; --coral-light: #fff0f0;
      --yellow: #FFD166; --navy: #1a2744;
    }
    .palette-cherry-soda {
      --turquoise: #E63946; --turquoise-dark: #c1121f; --turquoise-light: #ffe0e3;
      --coral: #f4a261; --coral-dark: #e07a3a; --coral-light: #fff3e8;
      --yellow: #FFD166; --navy: #1d2d44;
    }
    .palette-avocado {
      --turquoise: #588157; --turquoise-dark: #3a5a40; --turquoise-light: #dde5b6;
      --coral: #bc6c25; --coral-dark: #9a4f18; --coral-light: #fff0dc;
      --yellow: #ffe169; --navy: #1b2a1b;
    }
    .palette-midnight {
      --turquoise: #7B2FBE; --turquoise-dark: #5a1f8a; --turquoise-light: #ede0ff;
      --coral: #FF6B6B; --coral-dark: #e04f4f; --coral-light: #fff0f0;
      --yellow: #FFD166; --navy: #0d1b2a;
    }
    .palette-pink-lemonade {
      --turquoise: #e07ab1; --turquoise-dark: #b8538a; --turquoise-light: #fde8f3;
      --coral: #f4845f; --coral-dark: #d4603a; --coral-light: #fff0eb;
      --yellow: #ffe066; --navy: #3a1a2e;
    }

    /* SETTINGS */
    .settings-section {
      margin-bottom: 28px;
    }
    .settings-section-title {
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 0.7rem;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: var(--turquoise-dark);
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .settings-section-title::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--turquoise-light);
    }
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      margin-bottom: 4px;
    }
    .palette-swatch {
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      border: 3px solid transparent;
      transition: all 0.2s;
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
    }
    .palette-swatch.selected {
      border-color: var(--navy);
      transform: scale(1.08);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .swatch-top { flex: 1; }
    .swatch-bottom { height: 30%; }
    .swatch-label {
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.65rem;
      text-align: center;
      margin-top: 5px;
      color: var(--charcoal);
    }
    .settings-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;
      background: var(--cream);
      border-radius: 12px;
      margin-bottom: 8px;
    }
    .settings-row-label {
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.85rem;
      color: var(--navy);
    }
    .settings-row-sub {
      font-size: 0.72rem;
      color: var(--gray);
      margin-top: 2px;
    }
    .toggle-switch {
      width: 44px;
      height: 24px;
      border-radius: 12px;
      background: var(--light-gray);
      position: relative;
      cursor: pointer;
      transition: background 0.2s;
      border: none;
      flex-shrink: 0;
    }
    .toggle-switch.on { background: var(--turquoise); }
    .toggle-switch::after {
      content: '';
      position: absolute;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: white;
      top: 3px;
      left: 3px;
      transition: transform 0.2s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }
    .toggle-switch.on::after { transform: translateX(20px); }
    .api-key-input-wrap {
      position: relative;
    }
    .api-key-input-wrap .form-input {
      font-family: monospace;
      font-size: 0.78rem;
      padding-right: 70px;
    }
    .api-key-save-btn {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      background: var(--turquoise);
      color: white;
      border: none;
      border-radius: 6px;
      padding: 5px 12px;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 0.72rem;
      cursor: pointer;
    }
    .danger-zone {
      background: var(--coral-light);
      border: 1.5px solid var(--coral);
      border-radius: 12px;
      padding: 14px;
    }
    .danger-zone-title {
      font-family: 'Nunito', sans-serif;
      font-weight: 800;
      font-size: 0.75rem;
      color: var(--coral-dark);
      margin-bottom: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    /* RESPONSIVE */
    @media (max-width: 480px) {
      .app-title { font-size: 1.4rem; }
      .recipe-grid { grid-template-columns: 1fr; }
      .form-row, .form-row-3 { grid-template-columns: 1fr; }
      .detail-time-info { gap: 10px; }
    }
  `}</style>
);

// ============================================================
// HELPERS
// ============================================================

function toFraction(decimal) {
  if (decimal === 0) return "0";
  const whole = Math.floor(decimal);
  const frac = decimal - whole;
  const fractions = [
    [1, 4, "¼"], [1, 3, "⅓"], [1, 2, "½"], [2, 3, "⅔"], [3, 4, "¾"],
    [1, 8, "⅛"], [3, 8, "⅜"], [5, 8, "⅝"], [7, 8, "⅞"]
  ];
  let best = null, bestDiff = 1;
  for (const [n, d, sym] of fractions) {
    const diff = Math.abs(frac - n / d);
    if (diff < bestDiff) { bestDiff = diff; best = sym; }
  }
  if (bestDiff > 0.08) {
    // just round
    return whole > 0 ? `${whole}` : `${Math.round(decimal * 4) / 4}`;
  }
  if (frac < 0.05) return whole > 0 ? `${whole}` : "0";
  if (frac > 0.95) return `${whole + 1}`;
  return whole > 0 ? `${whole}${best}` : best;
}

function scaleAmount(amount, baseServings, currentServings) {
  if (!amount || isNaN(amount)) return amount;
  const scaled = (amount * currentServings) / baseServings;
  return toFraction(scaled);
}

function getTimeBucket(totalMins) {
  if (totalMins <= 30) return "quick";
  if (totalMins <= 60) return "medium";
  return "long";
}

function getTimeBucketLabel(bucket) {
  if (bucket === "quick") return "⚡ Quick";
  if (bucket === "medium") return "⏱ Medium";
  return "🕐 Long";
}

function getTypeClass(type) {
  const map = {
    Appetizer: "type-appetizer", Main: "type-main", Side: "type-side",
    Dessert: "type-dessert", Soup: "type-soup", Salad: "type-salad",
    Breakfast: "type-breakfast", Drink: "type-drink", Snack: "type-snack"
  };
  return map[type] || "type-snack";
}

function getRecipeEmoji(type) {
  const map = {
    Appetizer: "🥗", Main: "🍽️", Side: "🥘", Dessert: "🍰",
    Soup: "🍲", Salad: "🥙", Breakfast: "🥞", Drink: "🧃", Snack: "🍿"
  };
  return map[type] || "🍴";
}

// Parse ingredient string like "2 cups flour, sifted" -> { amount, unit, name, note }
function parseIngredient(str) {
  if (typeof str === "object") return str;
  const match = str.match(/^([\d¼½¾⅓⅔⅛⅜⅝⅞\/\.\s]+)?\s*(cups?|tbsp|tsp|oz|lbs?|g|kg|ml|l|cloves?|slices?|pieces?|pinch|dash|handful|cans?|packages?|pkg|bunches?|sprigs?|heads?)?\s*(.+?)(?:,\s*(.+))?$/i);
  if (match) {
    let amt = (match[1] || "").trim();
    // convert fraction chars to decimals for storage
    amt = amt.replace("¼", ".25").replace("½", ".5").replace("¾", ".75")
             .replace("⅓", ".333").replace("⅔", ".667")
             .replace("⅛", ".125").replace("⅜", ".375")
             .replace("⅝", ".625").replace("⅞", ".875");
    const num = parseFloat(amt);
    return {
      amount: isNaN(num) ? null : num,
      amountStr: (match[1] || "").trim(),
      unit: (match[2] || "").trim(),
      name: (match[3] || str).trim(),
      note: (match[4] || "").trim()
    };
  }
  return { amount: null, amountStr: "", unit: "", name: str.trim(), note: "" };
}

// Package size hints
function getPackageHint(unit, name, amount) {
  const n = name.toLowerCase();
  const u = unit.toLowerCase();
  if ((n.includes("cream cheese")) && amount) {
    const pkgs = amount / 8;
    return pkgs >= 1 ? `${toFraction(pkgs)} package${pkgs !== 1 ? "s" : ""} (${amount} oz)` : null;
  }
  if (n.includes("butter") && u.includes("cup") && amount) {
    const sticks = amount * 2;
    return sticks >= 1 ? `${toFraction(sticks)} stick${sticks !== 1 ? "s" : ""}` : null;
  }
  if ((n.includes("chicken broth") || n.includes("chicken stock")) && u.includes("cup") && amount) {
    const cans = (amount * 8) / 14;
    return cans >= 0.5 ? `~${toFraction(Math.ceil(cans * 2) / 2)} can${cans > 1 ? "s" : ""}` : null;
  }
  return null;
}

// Grocery sections
function assignSection(ingredient) {
  const n = ingredient.name.toLowerCase();
  if (/(flour|sugar|salt|pepper|baking powder|baking soda|vanilla|cinnamon|nutmeg|paprika|oregano|basil|thyme|cumin|oil|vinegar|broth|stock|honey|syrup|chocolate chip|cocoa|yeast|cornstarch|breadcrumb|panko)/.test(n)) return "Pantry";
  if (/(milk|cream|butter|cheese|egg|yogurt|sour cream|cream cheese|half.and.half|heavy cream)/.test(n)) return "Dairy & Eggs";
  if (/(chicken|beef|pork|turkey|lamb|salmon|tuna|shrimp|bacon|sausage|ham|ground)/.test(n)) return "Meat & Seafood";
  if (/(apple|banana|lemon|lime|orange|berry|berries|strawberr|blueberr|raspberr|peach|cherry|grape|mango|pineapple|tomato|avocado)/.test(n)) return "Fresh Produce";
  if (/(onion|garlic|potato|carrot|celery|pepper|mushroom|spinach|lettuce|broccoli|zucchini|cucumber|corn|pea|bean|cabbage|kale|herbs|parsley|cilantro|chive|scallion|leek)/.test(n)) return "Fresh Produce";
  if (/(pasta|rice|noodle|bread|tortilla|cracker|chip|cereal|oat|quinoa)/.test(n)) return "Grains & Bread";
  if (/(can|canned|tomato paste|tomato sauce|diced tomato|kidney bean|black bean|chickpea|lentil|coconut milk)/.test(n)) return "Canned & Jarred";
  if (/(frozen|ice cream)/.test(n)) return "Frozen";
  return "Other";
}

const SECTION_ORDER = ["Dairy & Eggs", "Meat & Seafood", "Fresh Produce", "Pantry", "Grains & Bread", "Canned & Jarred", "Frozen", "Other"];

// ============================================================
// SEED RECIPES
// ============================================================
const SEED_RECIPES = [
  {
    id: "seed-1",
    name: "Classic Beef Stroganoff",
    type: "Main",
    difficulty: 2,
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    description: "A creamy, comforting classic straight from mid-century supper clubs.",
    ingredients: [
      { amount: 1.5, amountStr: "1½", unit: "lbs", name: "beef sirloin", note: "thinly sliced" },
      { amount: 1, amountStr: "1", unit: "cup", name: "sour cream", note: "" },
      { amount: 2, amountStr: "2", unit: "cups", name: "mushrooms", note: "sliced" },
      { amount: 1, amountStr: "1", unit: "medium", name: "onion", note: "diced" },
      { amount: 2, amountStr: "2", unit: "tbsp", name: "butter", note: "" },
      { amount: 1, amountStr: "1", unit: "tbsp", name: "flour", note: "" },
      { amount: 1, amountStr: "1", unit: "cup", name: "beef broth", note: "" },
      { amount: 1, amountStr: "1", unit: "tsp", name: "Worcestershire sauce", note: "" },
      { amount: 8, amountStr: "8", unit: "oz", name: "egg noodles", note: "cooked" },
      { amount: null, amountStr: "", unit: "", name: "salt and pepper", note: "to taste" }
    ],
    steps: [
      "Season beef strips generously with salt and pepper.",
      "Melt butter in a large skillet over medium-high heat. Brown beef quickly in batches (2 min per side). Remove and set aside.",
      "In the same pan, sauté onions until translucent, then add mushrooms and cook until golden, about 5 minutes.",
      "Sprinkle flour over vegetables and stir for 1 minute. Pour in beef broth and Worcestershire sauce, stirring constantly.",
      "Simmer sauce until thickened, about 5 minutes. Reduce heat to low and stir in sour cream.",
      "Return beef to the pan and heat through — do not boil after adding sour cream.",
      "Serve over egg noodles."
    ]
  },
  {
    id: "seed-2",
    name: "Lemon Icebox Pie",
    type: "Dessert",
    difficulty: 1,
    prepTime: 20,
    cookTime: 15,
    servings: 8,
    description: "Cool, tart, and sweet — a no-fuss refrigerator pie that's pure 1950s magic.",
    ingredients: [
      { amount: 1, amountStr: "1", unit: "", name: "graham cracker crust", note: "9-inch" },
      { amount: 14, amountStr: "14", unit: "oz", name: "sweetened condensed milk", note: "1 can" },
      { amount: 3, amountStr: "3", unit: "", name: "egg yolks", note: "" },
      { amount: 0.5, amountStr: "½", unit: "cup", name: "fresh lemon juice", note: "about 3 lemons" },
      { amount: 1, amountStr: "1", unit: "tbsp", name: "lemon zest", note: "" },
      { amount: 1.5, amountStr: "1½", unit: "cups", name: "heavy whipping cream", note: "" },
      { amount: 3, amountStr: "3", unit: "tbsp", name: "powdered sugar", note: "" }
    ],
    steps: [
      "Preheat oven to 325°F.",
      "Whisk together condensed milk, egg yolks, lemon juice, and zest until smooth and combined.",
      "Pour filling into the graham cracker crust and bake for 15 minutes until just set.",
      "Cool completely at room temperature, then refrigerate for at least 2 hours.",
      "Just before serving, beat heavy cream with powdered sugar to stiff peaks.",
      "Top pie with whipped cream and a few curls of lemon zest."
    ]
  },
  {
    id: "seed-3",
    name: "French Onion Soup",
    type: "Soup",
    difficulty: 2,
    prepTime: 15,
    cookTime: 75,
    servings: 4,
    description: "Low and slow caramelized onions, rich beef broth, and a gorgeous gruyère crust.",
    ingredients: [
      { amount: 4, amountStr: "4", unit: "large", name: "yellow onions", note: "thinly sliced" },
      { amount: 4, amountStr: "4", unit: "tbsp", name: "butter", note: "" },
      { amount: 1, amountStr: "1", unit: "tbsp", name: "olive oil", note: "" },
      { amount: 0.5, amountStr: "½", unit: "cup", name: "dry white wine", note: "" },
      { amount: 4, amountStr: "4", unit: "cups", name: "beef broth", note: "" },
      { amount: 1, amountStr: "1", unit: "tsp", name: "fresh thyme", note: "" },
      { amount: 4, amountStr: "4", unit: "slices", name: "baguette", note: "toasted" },
      { amount: 1.5, amountStr: "1½", unit: "cups", name: "gruyère cheese", note: "grated" },
      { amount: null, amountStr: "", unit: "", name: "salt and pepper", note: "to taste" }
    ],
    steps: [
      "Melt butter with olive oil in a heavy pot over medium-low heat. Add onions and a pinch of salt.",
      "Cook onions slowly, stirring every 10 minutes, for 45–60 minutes until deeply caramelized and golden brown. Don't rush this.",
      "Add wine and scrape up any browned bits. Cook until wine evaporates, about 3 minutes.",
      "Add beef broth and thyme. Simmer 15 minutes. Season with salt and pepper.",
      "Preheat broiler. Ladle soup into oven-safe bowls, top each with a baguette slice, and pile on gruyère.",
      "Broil 3–4 minutes until cheese is bubbly and golden. Serve immediately."
    ]
  },
  {
    id: "seed-4",
    name: "Deviled Eggs",
    type: "Appetizer",
    difficulty: 1,
    prepTime: 20,
    cookTime: 12,
    servings: 6,
    description: "The quintessential party platter staple. Creamy, tangy, and gone in minutes.",
    ingredients: [
      { amount: 12, amountStr: "12", unit: "", name: "large eggs", note: "" },
      { amount: 0.333, amountStr: "⅓", unit: "cup", name: "mayonnaise", note: "" },
      { amount: 2, amountStr: "2", unit: "tsp", name: "yellow mustard", note: "" },
      { amount: 1, amountStr: "1", unit: "tbsp", name: "sweet pickle relish", note: "" },
      { amount: 1, amountStr: "1", unit: "tsp", name: "white wine vinegar", note: "" },
      { amount: null, amountStr: "", unit: "", name: "paprika", note: "for garnish" },
      { amount: null, amountStr: "", unit: "", name: "salt and pepper", note: "to taste" }
    ],
    steps: [
      "Place eggs in a single layer in a saucepan. Cover with cold water by an inch. Bring to a boil, then cover, remove from heat, and let sit 12 minutes.",
      "Transfer to an ice bath for 10 minutes. Peel carefully.",
      "Halve eggs lengthwise. Pop yolks into a bowl; arrange whites on a platter.",
      "Mash yolks with mayonnaise, mustard, relish, and vinegar until smooth. Season with salt and pepper.",
      "Fill each white with the yolk mixture using a spoon or piping bag.",
      "Dust generously with paprika and refrigerate until ready to serve."
    ]
  },
  {
    id: "seed-5",
    name: "Buttermilk Pancakes",
    type: "Breakfast",
    difficulty: 1,
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    description: "Fluffy, golden, Sunday-morning pancakes with that perfect buttermilk tang.",
    ingredients: [
      { amount: 2, amountStr: "2", unit: "cups", name: "all-purpose flour", note: "" },
      { amount: 2, amountStr: "2", unit: "tbsp", name: "sugar", note: "" },
      { amount: 2, amountStr: "2", unit: "tsp", name: "baking powder", note: "" },
      { amount: 1, amountStr: "1", unit: "tsp", name: "baking soda", note: "" },
      { amount: 0.5, amountStr: "½", unit: "tsp", name: "salt", note: "" },
      { amount: 2, amountStr: "2", unit: "cups", name: "buttermilk", note: "" },
      { amount: 2, amountStr: "2", unit: "", name: "large eggs", note: "" },
      { amount: 3, amountStr: "3", unit: "tbsp", name: "butter", note: "melted" },
      { amount: 1, amountStr: "1", unit: "tsp", name: "vanilla extract", note: "" }
    ],
    steps: [
      "Whisk flour, sugar, baking powder, baking soda, and salt in a large bowl.",
      "In a separate bowl, whisk together buttermilk, eggs, melted butter, and vanilla.",
      "Pour wet ingredients into dry and fold gently until just combined — lumps are fine! Don't overmix.",
      "Heat a griddle or skillet over medium heat. Butter lightly.",
      "Pour about ¼ cup batter per pancake. Cook until bubbles form on the surface and edges look set, about 2–3 minutes. Flip and cook 1–2 more minutes.",
      "Serve immediately with butter and maple syrup."
    ]
  },
  {
    id: "seed-6",
    name: "Classic Caesar Salad",
    type: "Salad",
    difficulty: 2,
    prepTime: 25,
    cookTime: 10,
    servings: 4,
    description: "House-made dressing, crunchy croutons, and shaved parmesan — the real deal.",
    ingredients: [
      { amount: 2, amountStr: "2", unit: "heads", name: "romaine lettuce", note: "chopped" },
      { amount: 3, amountStr: "3", unit: "cloves", name: "garlic", note: "" },
      { amount: 4, amountStr: "4", unit: "", name: "anchovy fillets", note: "" },
      { amount: 2, amountStr: "2", unit: "", name: "egg yolks", note: "" },
      { amount: 2, amountStr: "2", unit: "tbsp", name: "lemon juice", note: "fresh" },
      { amount: 1, amountStr: "1", unit: "tsp", name: "Dijon mustard", note: "" },
      { amount: 0.5, amountStr: "½", unit: "cup", name: "olive oil", note: "" },
      { amount: 0.5, amountStr: "½", unit: "cup", name: "parmesan cheese", note: "freshly grated, plus shavings" },
      { amount: 2, amountStr: "2", unit: "cups", name: "bread", note: "cubed, for croutons" },
      { amount: null, amountStr: "", unit: "", name: "black pepper", note: "freshly cracked" }
    ],
    steps: [
      "Make croutons: toss bread cubes in olive oil and a pinch of salt. Bake at 375°F for 10–12 minutes until golden. Cool.",
      "Mash garlic and anchovies into a paste with a fork or pestle.",
      "Whisk together the paste, egg yolks, lemon juice, and Dijon mustard.",
      "Slowly drizzle in olive oil while whisking constantly to emulsify into a creamy dressing. Stir in grated parmesan.",
      "Toss romaine with dressing until well coated. Add croutons and extra parmesan.",
      "Crack plenty of black pepper over the top and serve immediately."
    ]
  }
];

// ============================================================
// STARBURST SVG
// ============================================================
function Starburst({ size = 52, color = "#FFD166" }) {
  const points = 12;
  const outerR = size / 2;
  const innerR = outerR * 0.6;
  const cx = size / 2;
  const cy = size / 2;
  const pts = [];
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={pts.join(" ")} fill={color} />
    </svg>
  );
}

// ============================================================
// RECIPE CARD
// ============================================================
function RecipeCard({ recipe, onOpen, onToggleMaking, onToggleMade, onAddToList, makingIds, madeIds, listIds, servings, onSetServings }) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  const bucket = getTimeBucket(totalTime);
  const isMaking = makingIds.has(recipe.id);
  const isMade = madeIds.has(recipe.id);
  const isOnList = listIds.has(recipe.id);
  const currentServings = servings || recipe.servings || 4;

  return (
    <div className="recipe-card" onClick={() => onOpen(recipe)}>
      <div className="card-img-area">
        <div className="card-img-bg-pattern" />
        {recipe.imageUrl
          ? <img src={recipe.imageUrl} alt={recipe.name} />
          : <span className="card-emoji">{getRecipeEmoji(recipe.type)}</span>
        }
        <span className={`time-badge ${bucket}`}>{getTimeBucketLabel(bucket)}</span>
      </div>
      <div className="card-body">
        <div className="card-title">{recipe.name}</div>
        <div className="card-meta">
          <span className={`type-badge ${getTypeClass(recipe.type)}`}>{recipe.type}</span>
          <div className="difficulty-dots">
            {[1, 2, 3].map(d => (
              <div key={d} className={`dot ${d <= (recipe.difficulty || 1) ? "filled" : ""}`} />
            ))}
          </div>
          <span style={{ fontSize: "0.72rem", color: "var(--gray)" }}>
            {totalTime > 0 ? `${totalTime} min` : ""}
          </span>
          <div
            style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: "auto" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="stepper-btn"
              style={{ width: 22, height: 22, fontSize: "0.85rem", borderWidth: 1.5 }}
              onClick={() => onSetServings(recipe.id, Math.max(1, currentServings - 1))}
            >−</button>
            <span style={{ fontFamily: "'Pacifico', cursive", fontSize: "0.95rem", color: "var(--coral)", minWidth: 16, textAlign: "center" }}>
              {currentServings}
            </span>
            <button
              className="stepper-btn"
              style={{ width: 22, height: 22, fontSize: "0.85rem", borderWidth: 1.5 }}
              onClick={() => onSetServings(recipe.id, currentServings + 1)}
            >+</button>
          </div>
        </div>
        <div className="card-actions" onClick={e => e.stopPropagation()}>
          <button
            className={`action-btn ${isMaking ? "active-making" : ""}`}
            onClick={() => onToggleMaking(recipe.id)}
            title="I'm Making This"
          >
            <span className="action-icon">🍳</span>
            <span>Making</span>
          </button>
          <button
            className={`action-btn ${isMade ? "active-made" : ""}`}
            onClick={() => onToggleMade(recipe.id)}
            title="I've Made This"
          >
            <span className="action-icon">👨‍🍳</span>
            <span>Made It</span>
          </button>
          <button
            className={`action-btn ${isOnList ? "active-list" : ""}`}
            onClick={() => onAddToList(recipe.id)}
            title="Add to Shopping List"
          >
            <span className="action-icon">🛒</span>
            <span>List</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// RECIPE DETAIL MODAL
// ============================================================
function RecipeDetail({ recipe, onClose, onEdit, onDelete, servings, setServings, onToggleMaking, onToggleMade, onAddToList, makingIds, madeIds, listIds, cookingProgress, onToggleIngredient, onToggleStep }) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  const bucket = getTimeBucket(totalTime);
  const base = recipe.servings || 4;
  const isMaking = makingIds.has(recipe.id);
  const isMade = madeIds.has(recipe.id);
  const isOnList = listIds.has(recipe.id);

  // Checklist mode: only when actively Making
  const checklistMode = isMaking;
  const checkedIngredients = new Set(cookingProgress.ingredients || []);
  const checkedSteps = new Set(cookingProgress.steps || []);
  const totalIngredients = (recipe.ingredients || []).length;
  const totalSteps = (recipe.steps || []).length;

  return (
    <div className="modal-overlay" onClick={e => { if (e.target.classList.contains("modal-overlay")) onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">{recipe.name}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", marginTop: 3 }}>
              {recipe.description}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="detail-badges" style={{ marginBottom: 12 }}>
            <span className={`type-badge ${getTypeClass(recipe.type)}`}>{recipe.type}</span>
            <div className="difficulty-dots">
              {[1, 2, 3].map(d => (
                <div key={d} className={`dot ${d <= (recipe.difficulty || 1) ? "filled" : ""}`} />
              ))}
            </div>
            <span className={`time-badge ${bucket}`} style={{ position: "static", fontSize: "0.7rem" }}>
              {getTimeBucketLabel(bucket)}
            </span>
          </div>

          <div className="detail-time-info">
            {recipe.prepTime > 0 && (
              <div className="time-item">
                <span className="time-label">Prep</span>
                <span className="time-value">{recipe.prepTime} min</span>
              </div>
            )}
            {recipe.cookTime > 0 && (
              <div className="time-item">
                <span className="time-label">Cook</span>
                <span className="time-value">{recipe.cookTime} min</span>
              </div>
            )}
            {totalTime > 0 && (
              <div className="time-item">
                <span className="time-label">Total</span>
                <span className="time-value">{totalTime} min</span>
              </div>
            )}
          </div>

          <div className="card-actions" style={{ marginBottom: 16 }}>
            <button
              className={`action-btn ${isMaking ? "active-making" : ""}`}
              onClick={() => onToggleMaking(recipe.id)}
            >
              <span className="action-icon">🍳</span>
              <span>Making</span>
            </button>
            <button
              className={`action-btn ${isMade ? "active-made" : ""}`}
              onClick={() => onToggleMade(recipe.id)}
            >
              <span className="action-icon">👨‍🍳</span>
              <span>Made It</span>
            </button>
            <button
              className={`action-btn ${isOnList ? "active-list" : ""}`}
              onClick={() => onAddToList(recipe.id)}
            >
              <span className="action-icon">🛒</span>
              <span>Add to List</span>
            </button>
          </div>

          <div className="serving-stepper">
            <span className="stepper-label">Servings</span>
            <button className="stepper-btn" onClick={() => setServings(Math.max(1, servings - 1))}>−</button>
            <span className="stepper-count">{servings}</span>
            <button className="stepper-btn" onClick={() => setServings(servings + 1)}>+</button>
          </div>

          {checklistMode && (
            <div style={{
              background: "linear-gradient(135deg, var(--coral-light), #fff8e0)",
              border: "1.5px solid var(--coral)",
              borderRadius: 10, padding: "9px 14px", marginBottom: 16,
              fontFamily: "'Nunito', sans-serif", fontWeight: 700,
              fontSize: "0.78rem", color: "var(--coral-dark)",
              display: "flex", alignItems: "center", gap: 8
            }}>
              🍳 You're making this! Tap ingredients & steps to check them off.
            </div>
          )}

          <div className="section-title">
            {checklistMode && (
              <span style={{ fontSize: "0.7rem", color: "var(--gray)", fontWeight: 600, marginLeft: 8, textTransform: "none", letterSpacing: 0 }}>
                {checkedIngredients.size}/{totalIngredients} checked
              </span>
            )}
          </div>
          <ul className="ingredient-list" style={{ listStyle: "none", paddingLeft: 0 }}>
            {(recipe.ingredients || []).map((ing, i) => {
              const scaled = ing.amount ? scaleAmount(ing.amount, base, servings) : ing.amountStr;
              const isChecked = checkedIngredients.has(i);
              return (
                <li
                  key={i}
                  className="ingredient-item"
                  onClick={checklistMode ? () => onToggleIngredient(i) : undefined}
                  style={checklistMode ? { cursor: "pointer", opacity: isChecked ? 0.35 : 1, transition: "opacity 0.2s" } : {}}
                >
                  {checklistMode && (
                    <span style={{
                      width: 18, height: 18, borderRadius: 4, border: `2px solid ${isChecked ? "var(--turquoise)" : "var(--light-gray)"}`,
                      background: isChecked ? "var(--turquoise)" : "white", display: "inline-flex",
                      alignItems: "center", justifyContent: "center", marginRight: 10, flexShrink: 0,
                      color: "white", fontSize: "0.7rem", transition: "all 0.15s"
                    }}>
                      {isChecked && "✓"}
                    </span>
                  )}
                  <span className="ingredient-amount" style={isChecked ? { textDecoration: "line-through" } : {}}>
                    {scaled} {ing.unit}
                  </span>
                  <span className="ingredient-name" style={isChecked ? { textDecoration: "line-through" } : {}}>{ing.name}</span>
                  {ing.note && <span className="ingredient-note">{ing.note}</span>}
                </li>
              );
            })}
          </ul>

          <div className="section-title">
            Instructions
            {checklistMode && (
              <span style={{ fontSize: "0.7rem", color: "var(--gray)", fontWeight: 600, marginLeft: 8, textTransform: "none", letterSpacing: 0 }}>
                {checkedSteps.size}/{totalSteps} done
              </span>
            )}
          </div>
          <ol className="steps-list" style={{ listStyle: "none", paddingLeft: 0 }}>
            {(recipe.steps || []).map((step, i) => {
              const isChecked = checkedSteps.has(i);
              return (
                <li
                  key={i}
                  className="step-item"
                  onClick={checklistMode ? () => onToggleStep(i) : undefined}
                  style={checklistMode ? { cursor: "pointer", opacity: isChecked ? 0.35 : 1, transition: "opacity 0.2s" } : {}}
                >
                  {checklistMode ? (
                    <span style={{
                      width: 18, height: 18, borderRadius: 4, border: `2px solid ${isChecked ? "var(--turquoise)" : "var(--light-gray)"}`,
                      background: isChecked ? "var(--turquoise)" : "white", display: "inline-flex",
                      alignItems: "center", justifyContent: "center", flexShrink: 0,
                      color: "white", fontSize: "0.7rem", transition: "all 0.15s", marginTop: 1
                    }}>
                      {isChecked && "✓"}
                    </span>
                  ) : (
                    <span className="step-num">{i + 1}</span>
                  )}
                  <span className="step-text" style={isChecked ? { textDecoration: "line-through" } : {}}>{step}</span>
                </li>
              );
            })}
          </ol>

          <div className="atomic-divider">✦ ✦ ✦</div>

          <div className="btn-row">
            <button className="btn-secondary" onClick={onEdit}>✏️ Edit Recipe</button>
            <button className="btn-danger" onClick={onDelete}>🗑 Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// RECIPE FORM (Add / Edit)
// ============================================================
function RecipeForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(() => initial || {
    name: "", type: "Main", difficulty: 2,
    prepTime: 0, cookTime: 0, servings: 4,
    description: "", ingredients: [
      { amount: null, amountStr: "", unit: "", name: "", note: "" }
    ], steps: [""]
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const setIng = (i, key, val) => {
    const ings = [...form.ingredients];
    ings[i] = { ...ings[i], [key]: val };
    if (key === "amountStr") {
      const num = parseFloat(val.replace("½", ".5").replace("¼", ".25").replace("¾", ".75").replace("⅓", ".333").replace("⅔", ".667"));
      ings[i].amount = isNaN(num) ? null : num;
    }
    set("ingredients", ings);
  };

  const addIng = () => set("ingredients", [...form.ingredients, { amount: null, amountStr: "", unit: "", name: "", note: "" }]);
  const removeIng = i => set("ingredients", form.ingredients.filter((_, idx) => idx !== i));

  const setStep = (i, val) => {
    const steps = [...form.steps];
    steps[i] = val;
    set("steps", steps);
  };

  const addStep = () => set("steps", [...form.steps, ""]);
  const removeStep = i => set("steps", form.steps.filter((_, idx) => idx !== i));

  const handleSave = () => {
    if (!form.name.trim()) return alert("Please enter a recipe name.");
    onSave({
      ...form,
      id: form.id || `r-${Date.now()}`,
      prepTime: parseInt(form.prepTime) || 0,
      cookTime: parseInt(form.cookTime) || 0,
      servings: parseInt(form.servings) || 4,
      difficulty: parseInt(form.difficulty) || 2,
      ingredients: form.ingredients.filter(i => i.name.trim()),
      steps: form.steps.filter(s => s.trim())
    });
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target.classList.contains("modal-overlay")) onCancel(); }}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{form.id ? "Edit Recipe" : "New Recipe"}</div>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Recipe Name</label>
            <input className="form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Grandma's Apple Pie" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-select" value={form.type} onChange={e => set("type", e.target.value)}>
                {["Appetizer","Main","Side","Dessert","Soup","Salad","Breakfast","Drink","Snack"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Difficulty</label>
              <select className="form-select" value={form.difficulty} onChange={e => set("difficulty", parseInt(e.target.value))}>
                <option value={1}>● Easy</option>
                <option value={2}>●● Medium</option>
                <option value={3}>●●● Hard</option>
              </select>
            </div>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Prep (min)</label>
              <input className="form-input" type="number" value={form.prepTime} onChange={e => set("prepTime", e.target.value)} min={0} />
            </div>
            <div className="form-group">
              <label className="form-label">Cook (min)</label>
              <input className="form-input" type="number" value={form.cookTime} onChange={e => set("cookTime", e.target.value)} min={0} />
            </div>
            <div className="form-group">
              <label className="form-label">Servings</label>
              <input className="form-input" type="number" value={form.servings} onChange={e => set("servings", e.target.value)} min={1} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input className="form-input" value={form.description} onChange={e => set("description", e.target.value)} placeholder="A short tagline..." />
          </div>

          <div className="section-title">Ingredients</div>
          {form.ingredients.map((ing, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div className="ingredient-row">
                <input className="form-input" placeholder="Amount" value={ing.amountStr} onChange={e => setIng(i, "amountStr", e.target.value)} />
                <input className="form-input" placeholder="Unit (cup, oz…)" value={ing.unit} onChange={e => setIng(i, "unit", e.target.value)} />
                <button className="remove-btn" onClick={() => removeIng(i)}>✕</button>
              </div>
              <div className="ingredient-row-name">
                <input className="form-input" placeholder="Ingredient name (e.g. cream cheese)" value={ing.name} onChange={e => setIng(i, "name", e.target.value)} />
              </div>
            </div>
          ))}
          <button className="add-ingredient-btn" onClick={addIng}>+ Add Ingredient</button>

          <div className="section-title">Instructions</div>
          {form.steps.map((step, i) => (
            <div key={i} className="step-row">
              <span className="step-num-label">{i + 1}.</span>
              <textarea
                className="form-textarea"
                style={{ minHeight: 60 }}
                placeholder={`Step ${i + 1}...`}
                value={step}
                onChange={e => setStep(i, e.target.value)}
              />
              {form.steps.length > 1 && (
                <button className="remove-btn" style={{ marginTop: 8 }} onClick={() => removeStep(i)}>✕</button>
              )}
            </div>
          ))}
          <button className="add-ingredient-btn" onClick={addStep}>+ Add Step</button>

          <div className="btn-row">
            <button className="btn-primary" onClick={handleSave}>💾 Save Recipe</button>
            <button className="btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PHOTO INTAKE MODAL
// ============================================================
function PhotoIntake({ onClose, onRecipeParsed, apiKey }) {
  const [images, setImages] = useState([]); // [{ url, data, mediaType }]
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const readFile = file => new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) return reject();
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target.result;
      resolve({
        url: result,
        data: result.split(",")[1],
        mediaType: file.type || "image/jpeg"
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleFile = async file => {
    try {
      const img = await readFile(file);
      setImages(prev => [...prev, img]);
    } catch {}
  };

  const handleDrop = e => {
    e.preventDefault();
    setDragging(false);
    Array.from(e.dataTransfer.files).forEach(f => handleFile(f));
  };

  const removeImage = idx => setImages(prev => prev.filter((_, i) => i !== idx));

  const analyze = async () => {
    if (!images.length) return;
    setLoading(true);
    setStatus(images.length > 1 ? `Reading ${images.length} pages...` : "Reading your recipe...");
    try {
      const prompt = `You are a recipe parser. Analyze ${images.length > 1 ? "these images which are all pages of the same recipe" : "this image of a recipe"} and extract all information into a structured JSON object.
      Return ONLY valid JSON with exactly these fields:
      {
        "name": "recipe name",
        "type": one of ["Appetizer","Main","Side","Dessert","Soup","Salad","Breakfast","Drink","Snack"],
        "difficulty": number 1-3,
        "prepTime": number in minutes,
        "cookTime": number in minutes,
        "servings": number,
        "description": "one sentence tagline",
        "ingredients": [{"amountStr": "½", "unit": "cup", "name": "flour", "note": "sifted", "amount": 0.5}],
        "steps": ["Step one...", "Step two..."]
      }
      For ingredients, amountStr should be the fraction/number as written (use fraction characters like ½, ¼, ¾, ⅓, ⅔).
      For amount field, convert to decimal (½ = 0.5, ¼ = 0.25, etc.) or null if not applicable.
      Return ONLY the JSON object, no markdown, no explanation.`;

      const imageBlocks = images.map(img => ({
        type: "image",
        source: { type: "base64", media_type: img.mediaType, data: img.data }
      }));

      const response = await fetch('/api/parse-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: [...imageBlocks, { type: "text", text: prompt }]
          }]
        })
      });

      const data = await response.json();
      
      // Check for API errors
      if (data.error) {
        setStatus(`Error: ${data.error.message || JSON.stringify(data.error)}`);
        setLoading(false);
        return;
      }

      const text = data.content?.map(b => b.text || "").join("") || "";
      if (!text) {
        setStatus("No response from AI. Please try again.");
        setLoading(false);
        return;
      }

      const clean = text.replace(/```json|```/g, "").trim();
      let parsed;
      try {
        parsed = JSON.parse(clean);
      } catch (e) {
        setStatus(`Couldn't parse recipe. Got: ${clean.slice(0, 100)}`);
        setLoading(false);
        return;
      }

      setStatus("Got it! Opening editor...");
      setTimeout(() => {
        onRecipeParsed({
          ...parsed,
          id: `r-${Date.now()}`
        });
      }, 600);
    } catch (err) {
      //alert(`Error: ${err.message || JSON.stringify(err)}`);
      setStatus(`Error: ${err.message || "Unknown error"}`);
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target.classList.contains("modal-overlay")) onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">📸 Snap a Recipe</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", marginTop: 3 }}>
              Add one or more photos — screenshots welcome!
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="api-key-notice">
            {apiKey
              ? <><strong>✓ API key configured.</strong> Ready to parse recipes from photos.</>
              : <><strong>No API key set.</strong> Add your Anthropic API key in <strong>⚙️ Settings → Photo Intake</strong> to use this feature.</>
            }
          </div>

          {/* Thumbnail strip */}
          {images.length > 0 && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
              {images.map((img, i) => (
                <div key={i} style={{ position: "relative", flexShrink: 0 }}>
                  <img
                    src={img.url}
                    alt={`Page ${i + 1}`}
                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: "2px solid var(--turquoise)" }}
                  />
                  <button
                    onClick={() => removeImage(i)}
                    style={{
                      position: "absolute", top: -6, right: -6,
                      width: 20, height: 20, borderRadius: "50%",
                      background: "var(--coral)", border: "none", color: "white",
                      fontSize: "0.65rem", cursor: "pointer", display: "flex",
                      alignItems: "center", justifyContent: "center", fontWeight: 700
                    }}
                  >✕</button>
                  <div style={{ fontSize: "0.6rem", textAlign: "center", color: "var(--gray)", marginTop: 2, fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                    Page {i + 1}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Drop zone — always visible so she can keep adding */}
          {!loading && (
            <div
              className={`photo-drop-zone ${dragging ? "dragging" : ""}`}
              style={{ padding: images.length > 0 ? "16px 24px" : "40px 24px" }}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
            >
              <div className="photo-drop-icon" style={{ fontSize: images.length > 0 ? "1.8rem" : "3rem" }}>📷</div>
              <div className="photo-drop-text">
                {images.length === 0 ? "Tap to choose a photo" : "+ Add another page"}
              </div>
              <div className="photo-drop-sub">
                {images.length === 0 ? "screenshots, photos, scanned pages" : "recipe continues on another page?"}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={e => { handleFile(e.target.files[0]); e.target.value = ""; }}
              />
            </div>
          )}

          {loading && (
            <div className="ai-status">
              <div className="ai-spinner" />
              {status}
            </div>
          )}

          {images.length > 0 && !loading && (
            <div className="btn-row" style={{ marginTop: 12 }}>
              <button className="btn-primary" onClick={analyze}>
                ✨ Parse {images.length > 1 ? `${images.length} Pages` : "This Recipe"}
              </button>
              <button className="btn-secondary" onClick={() => setImages([])}>
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SHOPPING LIST MODAL
// ============================================================
// ============================================================
// MASTER ITEM LIST (pre-populated)
// ============================================================
const DEFAULT_MASTER_ITEMS = [
  // Fresh Produce
  { id: "m-1", name: "Apples", section: "Fresh Produce" },
  { id: "m-2", name: "Bananas", section: "Fresh Produce" },
  { id: "m-3", name: "Lemons", section: "Fresh Produce" },
  { id: "m-4", name: "Limes", section: "Fresh Produce" },
  { id: "m-5", name: "Oranges", section: "Fresh Produce" },
  { id: "m-6", name: "Strawberries", section: "Fresh Produce" },
  { id: "m-7", name: "Blueberries", section: "Fresh Produce" },
  { id: "m-8", name: "Avocados", section: "Fresh Produce" },
  { id: "m-9", name: "Tomatoes", section: "Fresh Produce" },
  { id: "m-10", name: "Onions", section: "Fresh Produce" },
  { id: "m-11", name: "Garlic", section: "Fresh Produce" },
  { id: "m-12", name: "Potatoes", section: "Fresh Produce" },
  { id: "m-13", name: "Sweet Potatoes", section: "Fresh Produce" },
  { id: "m-14", name: "Carrots", section: "Fresh Produce" },
  { id: "m-15", name: "Celery", section: "Fresh Produce" },
  { id: "m-16", name: "Broccoli", section: "Fresh Produce" },
  { id: "m-17", name: "Spinach", section: "Fresh Produce" },
  { id: "m-18", name: "Kale", section: "Fresh Produce" },
  { id: "m-19", name: "Lettuce", section: "Fresh Produce" },
  { id: "m-20", name: "Bell Peppers", section: "Fresh Produce" },
  { id: "m-21", name: "Mushrooms", section: "Fresh Produce" },
  { id: "m-22", name: "Zucchini", section: "Fresh Produce" },
  { id: "m-23", name: "Cucumber", section: "Fresh Produce" },
  { id: "m-24", name: "Fresh Herbs", section: "Fresh Produce" },
  // Dairy & Eggs
  { id: "m-25", name: "Eggs", section: "Dairy & Eggs" },
  { id: "m-26", name: "Whole Milk", section: "Dairy & Eggs" },
  { id: "m-27", name: "Butter", section: "Dairy & Eggs" },
  { id: "m-28", name: "Cheddar Cheese", section: "Dairy & Eggs" },
  { id: "m-29", name: "Parmesan", section: "Dairy & Eggs" },
  { id: "m-30", name: "Cream Cheese", section: "Dairy & Eggs" },
  { id: "m-31", name: "Sour Cream", section: "Dairy & Eggs" },
  { id: "m-32", name: "Heavy Cream", section: "Dairy & Eggs" },
  { id: "m-33", name: "Greek Yogurt", section: "Dairy & Eggs" },
  { id: "m-34", name: "Mozzarella", section: "Dairy & Eggs" },
  // Meat & Seafood
  { id: "m-35", name: "Chicken Breasts", section: "Meat & Seafood" },
  { id: "m-36", name: "Ground Beef", section: "Meat & Seafood" },
  { id: "m-37", name: "Salmon", section: "Meat & Seafood" },
  { id: "m-38", name: "Bacon", section: "Meat & Seafood" },
  { id: "m-39", name: "Pork Chops", section: "Meat & Seafood" },
  { id: "m-40", name: "Shrimp", section: "Meat & Seafood" },
  { id: "m-41", name: "Turkey", section: "Meat & Seafood" },
  { id: "m-42", name: "Sausage", section: "Meat & Seafood" },
  // Pantry
  { id: "m-43", name: "Olive Oil", section: "Pantry" },
  { id: "m-44", name: "All-Purpose Flour", section: "Pantry" },
  { id: "m-45", name: "Sugar", section: "Pantry" },
  { id: "m-46", name: "Brown Sugar", section: "Pantry" },
  { id: "m-47", name: "Salt", section: "Pantry" },
  { id: "m-48", name: "Black Pepper", section: "Pantry" },
  { id: "m-49", name: "Vanilla Extract", section: "Pantry" },
  { id: "m-50", name: "Baking Powder", section: "Pantry" },
  { id: "m-51", name: "Baking Soda", section: "Pantry" },
  { id: "m-52", name: "Honey", section: "Pantry" },
  { id: "m-53", name: "Soy Sauce", section: "Pantry" },
  { id: "m-54", name: "Hot Sauce", section: "Pantry" },
  { id: "m-55", name: "Chicken Broth", section: "Pantry" },
  { id: "m-56", name: "Coconut Oil", section: "Pantry" },
  // Grains & Bread
  { id: "m-57", name: "Pasta", section: "Grains & Bread" },
  { id: "m-58", name: "Rice", section: "Grains & Bread" },
  { id: "m-59", name: "Bread", section: "Grains & Bread" },
  { id: "m-60", name: "Tortillas", section: "Grains & Bread" },
  { id: "m-61", name: "Oats", section: "Grains & Bread" },
  { id: "m-62", name: "Quinoa", section: "Grains & Bread" },
  { id: "m-63", name: "Crackers", section: "Grains & Bread" },
  // Canned & Jarred
  { id: "m-64", name: "Diced Tomatoes", section: "Canned & Jarred" },
  { id: "m-65", name: "Tomato Paste", section: "Canned & Jarred" },
  { id: "m-66", name: "Black Beans", section: "Canned & Jarred" },
  { id: "m-67", name: "Chickpeas", section: "Canned & Jarred" },
  { id: "m-68", name: "Coconut Milk", section: "Canned & Jarred" },
  { id: "m-69", name: "Tuna", section: "Canned & Jarred" },
  { id: "m-70", name: "Pasta Sauce", section: "Canned & Jarred" },
  // Frozen
  { id: "m-71", name: "Frozen Peas", section: "Frozen" },
  { id: "m-72", name: "Frozen Berries", section: "Frozen" },
  { id: "m-73", name: "Ice Cream", section: "Frozen" },
  { id: "m-74", name: "Frozen Edamame", section: "Frozen" },
  // Household
  { id: "m-75", name: "Dish Soap", section: "Household" },
  { id: "m-76", name: "Laundry Detergent", section: "Household" },
  { id: "m-77", name: "Paper Towels", section: "Household" },
  { id: "m-78", name: "Trash Bags", section: "Household" },
  { id: "m-79", name: "Aluminum Foil", section: "Household" },
  { id: "m-80", name: "Plastic Wrap", section: "Household" },
  { id: "m-81", name: "Parchment Paper", section: "Household" },
  { id: "m-82", name: "Sponges", section: "Household" },
  { id: "m-83", name: "Candles", section: "Household" },
  // Toiletries
  { id: "m-84", name: "Shampoo", section: "Toiletries" },
  { id: "m-85", name: "Conditioner", section: "Toiletries" },
  { id: "m-86", name: "Body Wash", section: "Toiletries" },
  { id: "m-87", name: "Toothpaste", section: "Toiletries" },
  { id: "m-88", name: "Deodorant", section: "Toiletries" },
  { id: "m-89", name: "Face Wash", section: "Toiletries" },
  { id: "m-90", name: "Moisturizer", section: "Toiletries" },
  { id: "m-91", name: "Sunscreen", section: "Toiletries" },
  { id: "m-92", name: "Razors", section: "Toiletries" },
  { id: "m-93", name: "Cotton Rounds", section: "Toiletries" },
  // Drinks
  { id: "m-94", name: "Coffee", section: "Drinks" },
  { id: "m-95", name: "Tea", section: "Drinks" },
  { id: "m-96", name: "Sparkling Water", section: "Drinks" },
  { id: "m-97", name: "Orange Juice", section: "Drinks" },
  { id: "m-98", name: "Wine", section: "Drinks" },
  { id: "m-99", name: "Beer", section: "Drinks" },
  { id: "m-100", name: "Kombucha", section: "Drinks" },
];

const ALL_SECTIONS_ORDER = ["Fresh Produce", "Dairy & Eggs", "Meat & Seafood", "Pantry", "Grains & Bread", "Canned & Jarred", "Frozen", "Household", "Toiletries", "Drinks", "Other"];
const LS_MASTER = "emily_master_items_v1";
const LS_MY_LIST = "emily_my_list_v1";

function ShoppingListModal({ recipes, listIds, servingOverrides = {}, onClose, onOpenRecipe, onRemoveRecipe }) {
  const [tab, setTab] = useState("recipes"); // "recipes" | "mylist" | "shopping"
  const [checked, setChecked] = useState(new Set());

  // Master items (pre-populated + custom)
  const [masterItems, setMasterItems] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_MASTER);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge: keep defaults + any custom ones not in defaults
        const defaultIds = new Set(DEFAULT_MASTER_ITEMS.map(i => i.id));
        const custom = parsed.filter(i => !defaultIds.has(i.id));
        return [...DEFAULT_MASTER_ITEMS, ...custom];
      }
    } catch {}
    return DEFAULT_MASTER_ITEMS;
  });

  // My active list: { itemId, name, section, qty, unit }
  const [myList, setMyList] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_MY_LIST);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("All");
  const [newItemName, setNewItemName] = useState("");
  const [newItemSection, setNewItemSection] = useState("Other");
  const [editingQty, setEditingQty] = useState({}); // itemId -> { qty, unit }

  useEffect(() => {
    // Save custom items only
    const defaultIds = new Set(DEFAULT_MASTER_ITEMS.map(i => i.id));
    const custom = masterItems.filter(i => !defaultIds.has(i.id));
    localStorage.setItem(LS_MASTER, JSON.stringify([...DEFAULT_MASTER_ITEMS, ...custom]));
  }, [masterItems]);

  useEffect(() => {
    localStorage.setItem(LS_MY_LIST, JSON.stringify(myList));
  }, [myList]);

  const toggle = key => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const isOnMyList = id => myList.some(i => i.itemId === id);
  const [expandedItem, setExpandedItem] = useState(null); // item id being configured
  const [pendingQty, setPendingQty] = useState({ qty: 1, unit: "" });

  // Smart units based on section
  const getUnitsForSection = section => {
    if (["Household", "Toiletries", "Drinks"].includes(section)) return null; // count only
    if (section === "Fresh Produce") return ["", "bunch", "bag", "lbs", "oz", "cup", "pint"];
    if (section === "Dairy & Eggs") return ["", "oz", "cup", "lbs", "pint", "carton", "stick", "dozen"];
    if (section === "Meat & Seafood") return ["", "lbs", "oz", "piece", "fillet", "slice", "pack"];
    if (section === "Pantry") return ["", "tsp", "tbsp", "cup", "oz", "lbs", "can", "bottle", "jar"];
    if (section === "Grains & Bread") return ["", "oz", "lbs", "cup", "loaf", "pack", "bag"];
    if (section === "Canned & Jarred") return ["", "can", "oz", "jar", "cup"];
    if (section === "Frozen") return ["", "oz", "bag", "box", "cup", "pint"];
    return ["", "oz", "lbs", "cup", "pack", "bag", "box"];
  };

  const tapItem = item => {
    if (isOnMyList(item.id)) {
      // Re-open picker pre-filled with current values
      const existing = myList.find(i => i.itemId === item.id);
      setExpandedItem(item.id);
      setPendingQty({ qty: existing?.qty ? Number(existing.qty) : 1, unit: existing?.unit || "" });
    } else {
      setExpandedItem(item.id);
      setPendingQty({ qty: 1, unit: "" });
    }
  };

  const confirmAdd = item => {
    if (pendingQty.qty === 0) {
      // qty 0 = remove
      setMyList(prev => prev.filter(i => i.itemId !== item.id));
    } else if (isOnMyList(item.id)) {
      // update existing
      setMyList(prev => prev.map(i => i.itemId === item.id
        ? { ...i, qty: String(pendingQty.qty), unit: pendingQty.unit }
        : i
      ));
    } else {
      // add new
      setMyList(prev => [...prev, {
        itemId: item.id, name: item.name, section: item.section,
        qty: String(pendingQty.qty), unit: pendingQty.unit
      }]);
    }
    setExpandedItem(null);
  };

  const toggleMyList = item => {
    if (isOnMyList(item.id)) {
      setMyList(prev => prev.filter(i => i.itemId !== item.id));
    } else {
      const q = editingQty[item.id] || { qty: "", unit: "" };
      setMyList(prev => [...prev, { itemId: item.id, name: item.name, section: item.section, qty: q.qty, unit: q.unit }]);
    }
  };

  const addCustomItem = () => {
    const name = newItemName.trim();
    if (!name) return;
    const id = `custom-${Date.now()}`;
    const newItem = { id, name, section: newItemSection, custom: true };
    setMasterItems(prev => [...prev, newItem]);
    setMyList(prev => [...prev, { itemId: id, name, section: newItemSection, qty: "", unit: "" }]);
    setNewItemName("");
  };

  const removeFromMyList = itemId => setMyList(prev => prev.filter(i => i.itemId !== itemId));

  const updateQty = (itemId, field, val) => {
    setMyList(prev => prev.map(i => i.itemId === itemId ? { ...i, [field]: val } : i));
  };

  // Recipe ingredients
  const recipeIngredients = [];
  listIds.forEach(id => {
    const r = recipes.find(rec => rec.id === id);
    if (r) {
      const baseServings = r.servings || 4;
      const currentServings = servingOverrides[id] || baseServings;
      const scale = currentServings / baseServings;
      (r.ingredients || []).forEach(ing => {
        const scaledAmount = ing.amount ? ing.amount * scale : null;
        const scaledAmountStr = scaledAmount ? toFraction(scaledAmount) : ing.amountStr;
        recipeIngredients.push({ ...ing, amount: scaledAmount, amountStr: scaledAmountStr, recipeId: id, recipeName: r.name });
      });
    }
  });

  // Group recipe ingredients by section
  const recipeSections = {};
  recipeIngredients.forEach((ing, i) => {
    const sec = assignSection(ing);
    if (!recipeSections[sec]) recipeSections[sec] = [];
    const key = `${ing.name.toLowerCase()}-${ing.unit.toLowerCase()}`;
    const existing = recipeSections[sec].find(x => x.key === key);
    if (existing && ing.amount) {
      existing.totalAmount = (existing.totalAmount || 0) + (ing.amount || 0);
    } else {
      recipeSections[sec].push({
        key: `recipe-${sec}-${i}`,
        name: ing.name, unit: ing.unit,
        amountStr: ing.amountStr, amount: ing.amount,
        totalAmount: ing.amount || null,
        note: ing.note
      });
    }
  });

  // Filtered master items for My List tab
  const filteredMaster = masterItems.filter(item => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    const matchSection = sectionFilter === "All" || item.section === sectionFilter;
    return matchSearch && matchSection;
  });

  const masterSections = [...new Set(masterItems.map(i => i.section))];

  // Build unified shopping mode items
  const buildShoppingItems = () => {
    const all = [];
    // Recipe items
    SECTION_ORDER.forEach(sec => {
      (recipeSections[sec] || []).forEach(item => {
        const amt = item.totalAmount ? toFraction(item.totalAmount) : item.amountStr;
        all.push({ key: item.key, section: sec, label: `${amt} ${item.unit} ${item.name}`.trim(), sub: item.note || null, source: "recipe" });
      });
    });
    // My list items
    myList.forEach(item => {
      const label = [item.qty, item.unit, item.name].filter(Boolean).join(" ");
      all.push({ key: `mylist-${item.itemId}`, section: item.section || "Other", label, sub: null, source: "mylist" });
    });
    // Group by section
    const grouped = {};
    all.forEach(item => {
      if (!grouped[item.section]) grouped[item.section] = [];
      grouped[item.section].push(item);
    });
    return grouped;
  };

  const shoppingGroups = buildShoppingItems();
  const totalShoppingItems = Object.values(shoppingGroups).flat().length;

  const ShoppingItemRow = ({ item }) => {
    const isChecked = checked.has(item.key);
    return (
      <div className={`shopping-item ${isChecked ? "checked" : ""}`}>
        <div className={`shopping-check ${isChecked ? "checked" : ""}`} onClick={() => toggle(item.key)}>
          {isChecked && "✓"}
        </div>
        <div className="shopping-item-text">
          <span className={item.source === "recipe" ? "shopping-amount" : "shopping-name"}>{item.label}</span>
          {item.sub && <div className="shopping-package">{item.sub}</div>}
        </div>
        {item.source === "recipe" && <span style={{ fontSize: "0.65rem", color: "var(--gray)", marginLeft: 4 }}>🍴</span>}
      </div>
    );
  };

  // Tab bar
  const TabBar = () => (
    <div style={{ display: "flex", borderTop: "1px solid var(--light-gray)", marginTop: 8 }}>
      {[
        { id: "recipes", label: "🍴 Recipes", count: recipeIngredients.length },
        { id: "mylist", label: "📋 My List", count: myList.length },
        { id: "shopping", label: "✨ Start Shopping", count: totalShoppingItems }
      ].map(t => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          style={{
            flex: 1,
            padding: "12px 4px 10px",
            background: tab === t.id ? "var(--turquoise-light)" : "white",
            border: "none",
            borderTop: tab === t.id ? `3px solid var(--turquoise)` : "3px solid transparent",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: "0.7rem",
            color: tab === t.id ? "var(--turquoise-dark)" : "var(--gray)",
            cursor: "pointer",
            transition: "all 0.15s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }}
        >
          <span>{t.label}</span>
          {t.count > 0 && (
            <span style={{
              background: tab === t.id ? "var(--turquoise)" : "var(--light-gray)",
              color: tab === t.id ? "white" : "var(--gray)",
              borderRadius: 10, padding: "1px 7px", fontSize: "0.65rem"
            }}>{t.count}</span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={e => { if (e.target.classList.contains("modal-overlay")) onClose(); }}>
      <div className="modal" style={{ display: "flex", flexDirection: "column", maxHeight: "90vh" }}>
        <div className="modal-header">
          <div>
            <div className="modal-title">
              {tab === "recipes" ? "🛒 Recipe List" : tab === "mylist" ? "📋 My List" : "✨ Shopping"}
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", marginTop: 3 }}>
              {tab === "recipes" && `${listIds.size} recipe${listIds.size !== 1 ? "s" : ""} · ${recipeIngredients.length} items`}
              {tab === "mylist" && `${myList.length} item${myList.length !== 1 ? "s" : ""} on your list`}
              {tab === "shopping" && `${totalShoppingItems} items total · ${checked.size} checked`}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body" style={{ flex: 1, overflowY: "auto" }}>

          {/* ── RECIPES TAB ── */}
          {tab === "recipes" && (
            recipeIngredients.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🛒</div>
                <div className="empty-title">No recipes added</div>
                <p>Tap 🛒 on any recipe card to add ingredients here.</p>
              </div>
            ) : (
              <>
                {/* Recipe header strip */}
                <div style={{ marginBottom: 16 }}>
                  <div className="section-title">Shopping for</div>
                  {[...listIds].map(id => {
                    const r = recipes.find(rec => rec.id === id);
                    if (!r) return null;
                    return (
                      <div key={id} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: "var(--cream)", borderRadius: 10, padding: "10px 14px",
                        marginBottom: 6, border: "1.5px solid var(--turquoise-light)"
                      }}>
                        <button
                          onClick={() => { onOpenRecipe(r); }}
                          style={{
                            background: "none", border: "none", cursor: "pointer", textAlign: "left",
                            fontFamily: "'Nunito', sans-serif", fontWeight: 800,
                            fontSize: "0.9rem", color: "var(--navy)", flex: 1, padding: 0
                          }}
                        >
                          {getRecipeEmoji(r.type)} {r.name}
                          <span style={{ fontSize: "0.7rem", color: "var(--gray)", fontWeight: 600, marginLeft: 8 }}>
                            {servingOverrides[id] || r.servings || 4} servings
                          </span>
                        </button>
                        <button
                          onClick={() => onRemoveRecipe(id)}
                          style={{
                            background: "none", border: "1.5px solid var(--coral)",
                            color: "var(--coral-dark)", borderRadius: 6,
                            width: 24, height: 24, cursor: "pointer", fontSize: "0.7rem",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 700, marginLeft: 10, flexShrink: 0
                          }}
                          title="Remove from list"
                        >✕</button>
                      </div>
                    );
                  })}
                </div>

                {SECTION_ORDER.map(sec => {
                  if (!recipeSections[sec]?.length) return null;
                  return (
                    <div key={sec} className="shopping-section">
                      <div className="section-header">{sec}</div>
                      {recipeSections[sec].map(item => {
                        const amt = item.totalAmount ? toFraction(item.totalAmount) : item.amountStr;
                        const pkgHint = item.totalAmount ? getPackageHint(item.unit, item.name, item.totalAmount) : null;
                        return (
                          <div key={item.key} className="shopping-item">
                            <div className="shopping-item-text">
                              <span className="shopping-amount">{amt} {item.unit} </span>
                              <span className="shopping-name">{item.name}</span>
                              {pkgHint && <div className="shopping-package">({pkgHint})</div>}
                              {item.note && <div className="shopping-package">{item.note}</div>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            )
          )}

          {/* ── MY LIST TAB ── */}
          {tab === "mylist" && (
            <>
              {/* Active list */}
              {myList.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div className="section-title">On Your List</div>
                  {myList.map(item => (
                    <div key={item.itemId} className="shopping-item" style={{ alignItems: "center" }}>
                      <div className="shopping-item-text" style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                        <span className="shopping-name" style={{ flex: 1 }}>{item.name}</span>
                        <input
                          className="form-input"
                          style={{ width: 50, padding: "4px 8px", fontSize: "0.8rem" }}
                          placeholder="qty"
                          value={item.qty}
                          onChange={e => updateQty(item.itemId, "qty", e.target.value)}
                          onClick={e => e.stopPropagation()}
                        />
                        <input
                          className="form-input"
                          style={{ width: 60, padding: "4px 8px", fontSize: "0.8rem" }}
                          placeholder="unit"
                          value={item.unit}
                          onChange={e => updateQty(item.itemId, "unit", e.target.value)}
                          onClick={e => e.stopPropagation()}
                        />
                        <button className="remove-btn" onClick={() => removeFromMyList(item.itemId)}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add custom item */}
              <div style={{ background: "var(--cream)", borderRadius: 12, padding: 12, marginBottom: 16 }}>
                <div className="section-title">Add Something New</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input
                    className="form-input"
                    placeholder="Item name..."
                    value={newItemName}
                    onChange={e => setNewItemName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addCustomItem()}
                    style={{ flex: 1 }}
                  />
                  <select
                    className="form-select"
                    value={newItemSection}
                    onChange={e => setNewItemSection(e.target.value)}
                    style={{ width: 130 }}
                  >
                    {ALL_SECTIONS_ORDER.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <button className="btn-primary" onClick={addCustomItem} style={{ padding: "8px 16px" }}>
                  + Add & Save to My Items
                </button>
              </div>

              {/* Search master list */}
              <div className="section-title">Browse Items</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <input
                    className="form-input"
                    placeholder="Search items..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ paddingRight: 36 }}
                  />
                  <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray)" }}>🔍</span>
                </div>
                <select
                  className="form-select"
                  value={sectionFilter}
                  onChange={e => setSectionFilter(e.target.value)}
                  style={{ width: 130 }}
                >
                  <option value="All">All Sections</option>
                  {masterSections.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {filteredMaster.length === 0 ? (
                <div style={{ textAlign: "center", color: "var(--gray)", padding: "20px 0", fontSize: "0.85rem" }}>
                  No items match — add it above!
                </div>
              ) : (
                ALL_SECTIONS_ORDER.map(sec => {
                  const items = filteredMaster.filter(i => i.section === sec);
                  if (!items.length) return null;
                  const units = getUnitsForSection(sec);
                  const isCountOnly = units === null;
                  return (
                    <div key={sec} className="shopping-section">
                      <div className="section-header">{sec}</div>
                      {items.map(item => {
                        const onList = isOnMyList(item.id);
                        const isExpanded = expandedItem === item.id;
                        return (
                          <div key={item.id}>
                            <div
                              className={`shopping-item ${onList ? "on-list" : ""}`}
                              style={{ cursor: "pointer" }}
                              onClick={() => !onList && !isExpanded ? tapItem(item) : onList ? tapItem(item) : null}
                            >
                              <div className={`shopping-check ${onList ? "checked" : ""}`}>
                                {onList && "✓"}
                              </div>
                              <div className="shopping-item-text" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span className="shopping-name" style={{ flex: 1 }}>{item.name}</span>
                                {item.custom && <span style={{ fontSize: "0.62rem", color: "var(--turquoise)", fontWeight: 700 }}>custom</span>}
                                {onList && (() => {
                                  const li = myList.find(i => i.itemId === item.id);
                                  return li && (li.qty || li.unit) ? (
                                    <span style={{ fontSize: "0.75rem", color: "var(--coral)", fontWeight: 700 }}>
                                      {[li.qty, li.unit].filter(Boolean).join(" ")}
                                    </span>
                                  ) : null;
                                })()}
                              </div>
                            </div>

                            {/* Inline qty picker */}
                            {isExpanded && (
                              <div style={{
                                background: onList ? "#e6fdf6" : "var(--cream)",
                                border: onList ? "1px solid #b2f0e0" : "none",
                                borderRadius: 10, padding: "10px 12px",
                                marginBottom: 6, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap"
                              }} onClick={e => e.stopPropagation()}>
                                {onList && (
                                  <span style={{ width: "100%", fontSize: "0.72rem", fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "#047a5c", marginBottom: 2 }}>
                                    ✏️ Edit quantity — or set to 0 to remove
                                  </span>
                                )}
                                {/* Count stepper */}
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <button className="stepper-btn" style={{ width: 26, height: 26, fontSize: "0.9rem" }}
                                    onClick={() => setPendingQty(p => ({ ...p, qty: Math.max(0, p.qty - 1) }))}>−</button>
                                  <span style={{ fontFamily: "'Pacifico', cursive", color: pendingQty.qty === 0 ? "var(--coral)" : "var(--coral)", fontSize: "1.1rem", minWidth: 20, textAlign: "center" }}>
                                    {pendingQty.qty}
                                  </span>
                                  <button className="stepper-btn" style={{ width: 26, height: 26, fontSize: "0.9rem" }}
                                    onClick={() => setPendingQty(p => ({ ...p, qty: p.qty + 1 }))}>+</button>
                                </div>

                                {/* Unit selector (food only) */}
                                {!isCountOnly && (
                                  <select
                                    className="form-select"
                                    style={{ flex: 1, minWidth: 110, padding: "6px 10px", fontSize: "0.8rem" }}
                                    value={pendingQty.unit}
                                    onChange={e => setPendingQty(p => ({ ...p, unit: e.target.value }))}
                                  >
                                    <option value="">— no unit —</option>
                                    {units.filter(u => u).map(u => <option key={u} value={u}>{u}</option>)}
                                  </select>
                                )}

                                <button
                                  style={{
                                    background: pendingQty.qty === 0 ? "var(--coral)" : "var(--turquoise)",
                                    color: "white", border: "none",
                                    borderRadius: 8, padding: "6px 14px", fontFamily: "'Nunito', sans-serif",
                                    fontWeight: 800, fontSize: "0.8rem", cursor: "pointer"
                                  }}
                                  onClick={() => confirmAdd(item)}
                                >
                                  {pendingQty.qty === 0 ? "🗑 Remove" : onList ? "Save ✓" : "Add ✓"}
                                </button>
                                <button
                                  style={{
                                    background: "none", color: "var(--gray)", border: "none",
                                    fontSize: "0.8rem", cursor: "pointer", fontFamily: "'Nunito', sans-serif"
                                  }}
                                  onClick={() => setExpandedItem(null)}
                                >
                                  cancel
                                </button>
                                {onList && pendingQty.qty > 0 && (
                                  <button
                                    style={{
                                      background: "none", color: "var(--coral-dark)", border: "1.5px solid var(--coral)",
                                      borderRadius: 8, padding: "5px 12px", fontFamily: "'Nunito', sans-serif",
                                      fontWeight: 700, fontSize: "0.75rem", cursor: "pointer"
                                    }}
                                    onClick={() => { setMyList(prev => prev.filter(i => i.itemId !== item.id)); setExpandedItem(null); }}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </>
          )}

          {/* ── START SHOPPING TAB ── */}
          {tab === "shopping" && (
            totalShoppingItems === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✨</div>
                <div className="empty-title">Nothing to shop for yet</div>
                <p>Add recipes from your collection and items from My List first.</p>
              </div>
            ) : (
              <>
                <div style={{ background: "var(--navy)", borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: "white", fontSize: "0.85rem" }}>
                    {checked.size} of {totalShoppingItems} done
                  </span>
                  <div style={{ display: "flex", gap: 6 }}>
                    {checked.size > 0 && (
                      <button className="btn-header" onClick={() => setChecked(new Set())} style={{ fontSize: "0.7rem", padding: "5px 10px" }}>
                        ↺ Uncheck All
                      </button>
                    )}
                    {checked.size === totalShoppingItems && totalShoppingItems > 0 && (
                      <button className="btn-header coral" style={{ fontSize: "0.7rem", padding: "5px 10px" }} onClick={() => {
                        setMyList([]);
                        setChecked(new Set());
                        setTab("recipes");
                      }}>
                        🎉 Done Shopping!
                      </button>
                    )}
                  </div>
                </div>

                {ALL_SECTIONS_ORDER.map(sec => {
                  const items = shoppingGroups[sec];
                  if (!items?.length) return null;
                  return (
                    <div key={sec} className="shopping-section">
                      <div className="section-header">{sec}</div>
                      {items.map(item => <ShoppingItemRow key={item.key} item={item} />)}
                    </div>
                  );
                })}
              </>
            )
          )}
        </div>

        <TabBar />
      </div>
    </div>
  );
}

// ============================================================
// PALETTES
// ============================================================
const PALETTES = [
  {
    id: "atomic-teal",
    name: "Atomic Teal",
    top: "#2ABFBF",
    bottom: "#1a2744",
    accent: "#FF6B6B"
  },
  {
    id: "cherry-soda",
    name: "Cherry Soda",
    top: "#E63946",
    bottom: "#1d2d44",
    accent: "#f4a261"
  },
  {
    id: "avocado",
    name: "Avocado",
    top: "#588157",
    bottom: "#1b2a1b",
    accent: "#bc6c25"
  },
  {
    id: "midnight",
    name: "Midnight",
    top: "#7B2FBE",
    bottom: "#0d1b2a",
    accent: "#FF6B6B"
  },
  {
    id: "pink-lemonade",
    name: "Pink Lemon",
    top: "#e07ab1",
    bottom: "#3a1a2e",
    accent: "#f4845f"
  }
];

// ============================================================
// SETTINGS MODAL
// ============================================================
function SettingsModal({ onClose, palette, setPalette, mealPlannerEnabled, setMealPlannerEnabled, apiKey, setApiKey, onExport, onImportClick, onClearRecipes }) {
  const [keyDraft, setKeyDraft] = useState(apiKey || "");
  const [keySaved, setKeySaved] = useState(false);

  const saveKey = () => {
    setApiKey(keyDraft.trim());
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target.classList.contains("modal-overlay")) onClose(); }}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">⚙️ Settings</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", marginTop: 3 }}>
              Preferences & data management
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">

          {/* APPEARANCE */}
          <div className="settings-section">
            <div className="settings-section-title">🎨 Appearance</div>
            <div className="palette-grid">
              {PALETTES.map(p => (
                <div key={p.id}>
                  <div
                    className={`palette-swatch ${palette === p.id ? "selected" : ""}`}
                    onClick={() => setPalette(p.id)}
                  >
                    <div className="swatch-top" style={{ background: p.top }} />
                    <div className="swatch-bottom" style={{ background: p.bottom }} />
                  </div>
                  <div className="swatch-label">{p.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* API KEY */}
          <div className="settings-section">
            <div className="settings-section-title">🤖 Photo Intake</div>
            <div style={{ marginBottom: 8, fontSize: "0.8rem", color: "var(--gray)", lineHeight: 1.5 }}>
              Paste your Anthropic API key here to enable photo-to-recipe. Saved locally to your browser only.
            </div>
            <div className="api-key-input-wrap">
              <input
                className="form-input"
                type="password"
                placeholder="sk-ant-..."
                value={keyDraft}
                onChange={e => setKeyDraft(e.target.value)}
                onKeyDown={e => e.key === "Enter" && saveKey()}
              />
              <button className="api-key-save-btn" onClick={saveKey}>
                {keySaved ? "✓ Saved!" : "Save"}
              </button>
            </div>
          </div>

          {/* COMING SOON */}
          <div className="settings-section">
            <div className="settings-section-title">📅 Features</div>
            <div className="settings-row">
              <div>
                <div className="settings-row-label">Meal Planner</div>
                <div className="settings-row-sub">Plan your week — coming soon</div>
              </div>
              <button
                className={`toggle-switch ${mealPlannerEnabled ? "on" : ""}`}
                onClick={() => setMealPlannerEnabled(v => !v)}
              />
            </div>
            {mealPlannerEnabled && (
              <div style={{ padding: "10px 14px", background: "var(--turquoise-light)", borderRadius: 10, fontSize: "0.8rem", color: "var(--turquoise-dark)", fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                🚧 Meal planner is on the roadmap — it'll appear here when it's ready!
              </div>
            )}
          </div>

          {/* DATA */}
          <div className="settings-section">
            <div className="settings-section-title">💾 Backup & Data</div>
            <div className="settings-row" style={{ cursor: "pointer" }} onClick={onExport}>
              <div>
                <div className="settings-row-label">⬇ Export Recipes</div>
                <div className="settings-row-sub">Download all recipes as a JSON backup file</div>
              </div>
              <span style={{ color: "var(--gray)", fontSize: "1.1rem" }}>›</span>
            </div>
            <div className="settings-row" style={{ cursor: "pointer" }} onClick={onImportClick}>
              <div>
                <div className="settings-row-label">⬆ Import Recipes</div>
                <div className="settings-row-sub">Merge recipes from a backup file</div>
              </div>
              <span style={{ color: "var(--gray)", fontSize: "1.1rem" }}>›</span>
            </div>
          </div>

          {/* DANGER ZONE */}
          <div className="danger-zone">
            <div className="danger-zone-title">⚠ Danger Zone</div>
            <button className="btn-danger" style={{ width: "100%" }} onClick={onClearRecipes}>
              🗑 Clear All My Recipes
            </button>
            <div style={{ fontSize: "0.72rem", color: "var(--gray)", marginTop: 8, lineHeight: 1.4 }}>
              This removes all personal recipes and restores the original seed recipes. Export a backup first!
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
const LS_KEY = "emily_recipes_v1";
const LS_STATES = "emily_recipe_states_v1";

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return SEED_RECIPES;
  });

  const [states, setStates] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_STATES);
      if (stored) return JSON.parse(stored);
    } catch {}
    return { making: [], made: [], list: [] };
  });

  const makingIds = new Set(states.making || []);
  const madeIds = new Set(states.made || []);
  const listIds = new Set(states.list || []);

  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid"); // grid | detail | form | photo | shopping | settings

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [detailServings, setDetailServings] = useState(4);
  const [servingOverrides, setServingOverrides] = useState({}); // recipeId -> serving count
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  // Cooking progress: { [recipeId]: { ingredients: number[], steps: number[] } }
  const LS_PROGRESS = "emily_cooking_progress_v1";
  const [cookingProgress, setCookingProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_PROGRESS);
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(LS_PROGRESS, JSON.stringify(cookingProgress));
  }, [cookingProgress]);

  const toggleCookingIngredient = (recipeId, idx) => {
    setCookingProgress(prev => {
      const cur = prev[recipeId] || { ingredients: [], steps: [] };
      const set = new Set(cur.ingredients);
      set.has(idx) ? set.delete(idx) : set.add(idx);
      return { ...prev, [recipeId]: { ...cur, ingredients: [...set] } };
    });
  };

  const toggleCookingStep = (recipeId, idx) => {
    setCookingProgress(prev => {
      const cur = prev[recipeId] || { ingredients: [], steps: [] };
      const set = new Set(cur.steps);
      set.has(idx) ? set.delete(idx) : set.add(idx);
      return { ...prev, [recipeId]: { ...cur, steps: [...set] } };
    });
  };

  const clearCookingProgress = recipeId => {
    setCookingProgress(prev => {
      const next = { ...prev };
      delete next[recipeId];
      return next;
    });
  };

  // Settings state
  const [palette, setPaletteState] = useState(() => localStorage.getItem("emily_palette") || "atomic-teal");
  const [mealPlannerEnabled, setMealPlannerEnabled] = useState(() => localStorage.getItem("emily_meal_planner") === "true");
  const [apiKey, setApiKeyState] = useState(() => {
    return localStorage.getItem("emily_api_key") || "";
  });

  const setPalette = val => { setPaletteState(val); localStorage.setItem("emily_palette", val); };
  const setApiKey = val => { setApiKeyState(val); localStorage.setItem("emily_api_key", val); };

  useEffect(() => {
    localStorage.setItem("emily_meal_planner", mealPlannerEnabled);
  }, [mealPlannerEnabled]);

  // Persist
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(LS_STATES, JSON.stringify({
      making: [...makingIds],
      made: [...madeIds],
      list: [...listIds]
    }));
  }, [states]);

  const showToast = msg => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  const toggleState = (key, id) => {
    setStates(prev => {
      const arr = prev[key] || [];
      const removing = arr.includes(id);
      if (key === "making" && removing) clearCookingProgress(id);
      return {
        ...prev,
        [key]: removing ? arr.filter(x => x !== id) : [...arr, id]
      };
    });
  };

  const openDetail = recipe => {
    setSelectedRecipe(recipe);
    setDetailServings(servingOverrides[recipe.id] || recipe.servings || 4);
    setView("detail");
  };

  const handleSaveRecipe = recipe => {
    setRecipes(prev => {
      const idx = prev.findIndex(r => r.id === recipe.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = recipe;
        return next;
      }
      return [recipe, ...prev];
    });
    setView("grid");
    showToast("✅ Recipe saved!");
  };

  const handleDelete = id => {
    if (!window.confirm("Delete this recipe?")) return;
    setRecipes(prev => prev.filter(r => r.id !== id));
    setView("grid");
    showToast("🗑 Recipe deleted.");
  };

  const handleClearRecipes = () => {
    if (!window.confirm("Clear all your personal recipes and restore seed recipes? Make sure you've exported a backup first!")) return;
    setRecipes(SEED_RECIPES);
    setView("grid");
    showToast("↺ Recipes restored to defaults.");
  };

  const handleExport = () => {
    const data = JSON.stringify(recipes, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `emily-recipes-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("📦 Recipes exported!");
  };

  const handleImport = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (Array.isArray(imported)) {
          setRecipes(prev => {
            const existingIds = new Set(prev.map(r => r.id));
            const newOnes = imported.filter(r => !existingIds.has(r.id));
            const toUpdate = imported.filter(r => existingIds.has(r.id));
            const merged = prev.map(r => {
              const match = toUpdate.find(u => u.id === r.id);
              return match || r;
            });
            const result = [...merged, ...newOnes];
            const added = newOnes.length;
            const updated = toUpdate.length;
            setTimeout(() => showToast(
              added > 0 && updated > 0
                ? `✅ Added ${added} new, updated ${updated} existing`
                : added > 0
                ? `✅ Added ${added} new recipe${added !== 1 ? "s" : ""}!`
                : `✅ Updated ${updated} recipe${updated !== 1 ? "s" : ""}`
            ), 0);
            return result;
          });
        }
      } catch {
        showToast("❌ Couldn't read that file.");
      }
    };
    e.target.value = "";
    reader.readAsText(file);
  };

  const importRef = useRef();

  // Filter
  const filteredRecipes = recipes.filter(r => {
    const total = (r.prepTime || 0) + (r.cookTime || 0);
    const bucket = getTimeBucket(total);
    if (filter === "making") return makingIds.has(r.id);
    if (filter === "made") return madeIds.has(r.id);
    if (filter !== "all" && bucket !== filter) return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) &&
        !r.description?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const types = ["all", ...Array.from(new Set(recipes.map(r => r.type))).sort()];

  return (
    <div className={`palette-${palette}`}>
      <GlobalStyles />

      {/* HEADER */}
      <div className="app-header">
        <button className="btn-gear-corner" onClick={() => setView("settings")} title="Settings">
          ⚙️
        </button>
        <div className="header-top">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="starburst">
              <Starburst size={52} />
              <span className="starburst-text">🍴</span>
            </div>
            <div>
              <div className="app-title">Emily's Kitchen</div>
              <div className="app-subtitle">Personal Recipe Collection</div>
            </div>
          </div>

          <div className="header-actions">
            <button className="btn-header coral" onClick={() => setView("photo")}>
              📸 Snap a Recipe
            </button>
            <button className="btn-header turquoise" onClick={() => { setEditingRecipe(null); setView("form"); }}>
              + New Recipe
            </button>
            <button
              className="btn-header"
              onClick={() => setView("shopping")}
            >
              🛒 {listIds.size > 0 ? `List (${listIds.size})` : "Shopping List"}
            </button>
            <input ref={importRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-tabs" style={{ marginBottom: 6 }}>
            {[["all", "✦ All"], ["quick", "⚡ Quick"], ["medium", "⏱ Medium"], ["long", "🕐 Long"]].map(([val, label]) => (
              <button
                key={val}
                className={`filter-tab ${filter === val ? "active" : ""}`}
                onClick={() => setFilter(val)}
              >
                {label}
              </button>
            ))}
          </div>
          {filter !== "making" && filter !== "made" && (
            <div className="filter-tabs" style={{ marginBottom: 6 }}>
              {types.map(t => (
                <button
                  key={t}
                  className={`filter-tab ${typeFilter === t ? "active" : ""}`}
                  onClick={() => setTypeFilter(t)}
                >
                  {t === "all" ? "All Types" : t}
                </button>
              ))}
            </div>
          )}
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === "making" ? "active" : ""}`}
              onClick={() => { setFilter("making"); setTypeFilter("all"); }}
              style={filter !== "making" && makingIds.size > 0 ? { borderColor: "var(--coral)", color: "var(--coral)" } : {}}
            >
              🍳 Making{makingIds.size > 0 ? ` (${makingIds.size})` : ""}
            </button>
            <button
              className={`filter-tab ${filter === "made" ? "active" : ""}`}
              onClick={() => { setFilter("made"); setTypeFilter("all"); }}
              style={filter !== "made" && madeIds.size > 0 ? { borderColor: "#06D6A0", color: "#06D6A0" } : {}}
            >
              👨‍🍳 Made{madeIds.size > 0 ? ` (${madeIds.size})` : ""}
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="app-wrapper">
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Search recipes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">{filter === "making" ? "🍳" : filter === "made" ? "👨‍🍳" : "🍽️"}</div>
            <div className="empty-title">
              {filter === "making" ? "Nothing cooking yet" : filter === "made" ? "No recipes made yet" : "No recipes found"}
            </div>
            <p>
              {filter === "making" ? "Tap 🍳 Making on any recipe card to add it here." :
               filter === "made" ? "Tap 👨‍🍳 Made It on any recipe card to track it here." :
               "Try a different filter, or add a new recipe!"}
            </p>
          </div>
        ) : (
          <div className="recipe-grid">
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onOpen={openDetail}
                onToggleMaking={id => { toggleState("making", id); showToast(makingIds.has(id) ? "Removed from Making" : "🍳 Added to Making!"); }}
                onToggleMade={id => { toggleState("made", id); showToast(madeIds.has(id) ? "Removed from Made" : "👨‍🍳 Marked as Made!"); }}
                onAddToList={id => { toggleState("list", id); showToast(listIds.has(id) ? "Removed from list" : "🛒 Added to Shopping List!"); }}
                makingIds={makingIds}
                madeIds={madeIds}
                listIds={listIds}
                servings={servingOverrides[recipe.id]}
                onSetServings={(id, val) => setServingOverrides(prev => ({ ...prev, [id]: val }))}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODALS */}
      {view === "detail" && selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setView("grid")}
          onEdit={() => { setEditingRecipe(selectedRecipe); setView("form"); }}
          onDelete={() => handleDelete(selectedRecipe.id)}
          servings={detailServings}
          setServings={val => {
            setDetailServings(val);
            setServingOverrides(prev => ({ ...prev, [selectedRecipe.id]: val }));
          }}
          onToggleMaking={id => { toggleState("making", id); showToast(makingIds.has(id) ? "Removed from Making" : "🍳 Added to Making!"); }}
          onToggleMade={id => { toggleState("made", id); showToast(madeIds.has(id) ? "Removed from Made" : "👨‍🍳 Marked as Made!"); }}
          onAddToList={id => { toggleState("list", id); showToast(listIds.has(id) ? "Removed from list" : "🛒 Added to Shopping List!"); }}
          makingIds={makingIds}
          madeIds={madeIds}
          listIds={listIds}
          cookingProgress={cookingProgress[selectedRecipe.id] || { ingredients: [], steps: [] }}
          onToggleIngredient={idx => toggleCookingIngredient(selectedRecipe.id, idx)}
          onToggleStep={idx => toggleCookingStep(selectedRecipe.id, idx)}
        />
      )}

      {view === "form" && (
        <RecipeForm
          initial={editingRecipe}
          onSave={handleSaveRecipe}
          onCancel={() => setView(selectedRecipe ? "detail" : "grid")}
        />
      )}

      {view === "photo" && (
        <PhotoIntake
          onClose={() => setView("grid")}
          apiKey={apiKey}
          onRecipeParsed={parsed => {
            // Normalize parsed data to prevent form crashes
            const safe = {
              ...parsed,
              ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients.map(ing => ({
                amount: ing.amount || null,
                amountStr: String(ing.amountStr || ""),
                unit: String(ing.unit || ""),
                name: String(ing.name || ""),
                note: String(ing.note || "")
              })) : [{ amount: null, amountStr: "", unit: "", name: "", note: "" }],
              steps: Array.isArray(parsed.steps) ? parsed.steps.map(s => String(s)) : [""]
            };
            setView("grid");
            setTimeout(() => {
              setEditingRecipe(safe);
              setView("form");
            }, 50);
          }}
        />
      )}

      {view === "shopping" && (
        <ShoppingListModal
          recipes={recipes}
          listIds={listIds}
          servingOverrides={servingOverrides}
          onClose={() => setView("grid")}
          onOpenRecipe={recipe => { setView("grid"); setTimeout(() => openDetail(recipe), 50); }}
          onRemoveRecipe={id => toggleState("list", id)}
        />
      )}

      {view === "settings" && (
        <SettingsModal
          onClose={() => setView("grid")}
          palette={palette}
          setPalette={setPalette}
          mealPlannerEnabled={mealPlannerEnabled}
          setMealPlannerEnabled={setMealPlannerEnabled}
          apiKey={apiKey}
          setApiKey={setApiKey}
          onExport={handleExport}
          onImportClick={() => importRef.current.click()}
          onClearRecipes={() => { handleClearRecipes(); setView("grid"); }}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

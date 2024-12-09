
# Technická analýza: Systém správy modalů

## Zadání

### Cíl projektu
1. Vytvořit systém, který zajistí:
   - Nikdy se nezobrazí více než jeden modal současně.
   - Zobrazení modalů se bude řídit podle **priority**:
     - **Vyšší priorita má přednost**.
     - Pokud mají dva nebo více modalů **stejnou prioritu**, použije se pravidlo **FIFO (First In, First Out)**.
   - Podpora pro:
     - **Uživatelské modaly** (otevřené na akci uživatele, např. kliknutí).
     - **Automaticky se zobrazující modaly** (např. na základě systémové události nebo odpovědi API).
   - Modaly mohou být z různých částí aplikace.

2. **Testovatelnost:**
   - Unit testy: Pokrytí všech scénářů správy modalů.
   - E2E testy: Simulace chování uživatele při práci s modaly.

---

## Návrh architektury

### Správa modalů
1. **Data struktura modalů:**
   ```typescript
   type Modal = {
     id: string; // Jedinečný identifikátor
     priority: number; // Priorita modalu (vyšší číslo = vyšší priorita)
     content: React.ReactNode; // Obsah modalu
     triggeredByUser: boolean; // Indikuje, zda modal spustil uživatel
     timestamp: number; // Čas přidání
   };
   ```

2. **Logika zpracování modalů:**
   - **Přidávání modalů:** Modal je přidán do fronty a tříděn podle priority a timestampu (FIFO při stejné prioritě).
   - **Odebírání modalů:** Po zavření aktuálního modalu se zobrazí další modal s nejvyšší prioritou.

3. **Komponenty:**
   - **`ModalManager`:** Zodpovědný za vykreslení aktuálního modalu.
   - **Volání modalů:** Každá část aplikace může přidat modal přes API `showModal`.

---

### Typy modalů
1. **Uživatelské modaly:**  
   - Otevřené na akci uživatele (např. kliknutí na tlačítko).
   - Např. potvrzovací dialog.

2. **Automaticky se zobrazující modaly:**  
   - Aktivované bez zásahu uživatele (např. po přijetí dat z API).
   - Např. upozornění o vypršení session.

3. **Modaly se stejnou prioritou:**  
   - Zobrazí se v pořadí, v jakém byly přidány (FIFO).

---

## Návrh testovacích scénářů

### Unit testy
1. **Správné třídění modalů podle priority.**
2. **FIFO chování při stejné prioritě.**
3. **Podpora uživatelských i automatických modalů.**

### E2E testy
1. **Ověření zobrazení správného modalu podle priority.**
2. **Zobrazení automaticky spuštěného modalu po určitém čase.**

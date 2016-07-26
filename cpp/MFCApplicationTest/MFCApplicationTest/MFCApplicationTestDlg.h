
// MFCApplicationTestDlg.h : header file
//

#pragma once
#include "afxwin.h"


// CMFCApplicationTestDlg dialog
class CMFCApplicationTestDlg : public CDialogEx
{
// Construction
public:
	CMFCApplicationTestDlg(CWnd* pParent = NULL);	// standard constructor

// Dialog Data
#ifdef AFX_DESIGN_TIME
	enum { IDD = IDD_MFCAPPLICATIONTEST_DIALOG };
#endif

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);	// DDX/DDV support


// Implementation
protected:
	HICON m_hIcon;

	// Generated message map functions
	virtual BOOL OnInitDialog();
	afx_msg void OnSysCommand(UINT nID, LPARAM lParam);
	afx_msg void OnPaint();
	afx_msg HCURSOR OnQueryDragIcon();
	DECLARE_MESSAGE_MAP()
public:
   CString m_cbEdit;
   afx_msg void OnCbnSelchangeCombo1();
private:
   CEdit m_ee;
public:
   afx_msg void OnEnChangeEdit1();
   afx_msg void OnEnChangeEdit2();
   afx_msg void OnEnChangeEdit3();
   CEdit m_ee2;
};
